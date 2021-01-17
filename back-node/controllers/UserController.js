const config = require('../config.json');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const ObjectId = require('mongodb').ObjectId;

router.get('/', function (req, res, next) {
  db.collection('users').find().toArray()
    .then(results => res.json(results))
    .catch(next);
});

router.get('/:id', function (req, res, next) {
  db.collection('users').findOne({_id: ObjectId(req.params.id)})
    .then(user => user ? res.json(user) : next({message: "User not found.", code: 404}))
    .catch(next);
});

router.delete('/:id', function (req, res, next) {
  db.collection('users').findOneAndDelete({_id: ObjectId(req.params.id)})
    .then(() => res.json({_id: req.params.id}))
    .catch(next);
});

router.post('/authenticate', function (req, res, next) {
  toAuthenticate(req.body)
    .then(user => user ? res.json(user) : next({message: "password incorrect", code: 404}))
    .catch(next);
})

router.post('/register', function (req, res, next) {
  let user = hashUserPassword(req.body);

  if (user.type === 'student') {

    db.collection('users').insertOne(user)
      .then(results => res.json({_id: results.insertedId}))
      .catch(err => {
        if (err.code === 11000) err = {...err, message: "Le nom d'utilisateur est déjà utilisé", code: 400};
          next(err);
      });

  } else if (user.type === 'company') {
    let {companyUser, company} = splitUserCompany(user);

    db.collection('companies').insertOne(company)
      .then((companiesResult) => {
        companyUser.companyId = companiesResult.insertedId;

        db.collection('users').insertOne(companyUser)
          .then((usersResults) => res.json({_id: usersResults.insertedId}))
          .catch(err => {
            if (err.code === 11000){
              db.collection('companies').findOneAndDelete({_id: company._id})
              .then(() => next({...err, message:"Le nom d'utilisateur est déjà utilisé", code: 400}))
              .catch(next);
            } else next(err);
          });
      })
      .catch(err => {
        if (err.code === 11000) err = {...err, message: "Le nom d'entreprise est déjà utilisé", code: 400};
        next(err);
      });
  } else {
    next({message: "Type d'utilisateur non reconnu", code: 500});
  }
});

router.put('/:id', function(req, res, next) {
  let user = formatPropertiesTypes(req.body);
  db.collection('users').updateOne({_id: ObjectId(req.params.id)}, {$set: {...user, _id: ObjectId(req.params.id)}})
      .then(() => res.json({_id: req.params.id}))
      .catch(err => {
          if (err.code === 11000) err = {...err, message: "Le nom d'utilisateur est déjà utilisé", code: 400};
          next(err);
      });
});

module.exports = router;

function formatPropertiesTypes(user) {
  delete user.token;

  if (user.type === 'student') {
    user.softSkills.forEach((softSkill, index) => {
      user.softSkills[index]._id = ObjectId(softSkill._id);
    });
  } else if (user.type === 'company') {
    user.companyId = ObjectId(user.companyId);
  }

  return user;
}

async function toAuthenticate({username, password}) {
  let user = await db.collection('users').findOne({ username });
  if (!user) throw({message: "username incorrect", code: 400});
  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithoutHash } = user;
    const token = jwt.sign({ sub: user._id }, config.secret);
    return { ...userWithoutHash, token };
  }
}

function hashUserPassword(user) {
  user.hash = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return user;
}

function splitUserCompany(userReceived) {
  let company = {
    name : userReceived.companyName,
    description: userReceived.description,
    srcImage: userReceived.srcImage,
    contact: userReceived.email,
    isPartner: false
  }
  if (userReceived.size) {
    company.size = userReceived.size
  }

  let companyUser = {
    username: userReceived.username,
    hash: userReceived.hash,
    email: userReceived.email,
    type: userReceived.type
  }

  return {companyUser, company};
}
