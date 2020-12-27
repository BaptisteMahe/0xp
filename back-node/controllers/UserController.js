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
  let {user, company} = splitUserCompany(req.body);
  if (user.isStudent) {
    db.collection('users').insertOne(user)
      .then((results) => res.json({_id: results.insertedId}))
      .catch(err => {
        if (err.code === 11000) err = {...err, message: "Le nom d'utilisateur est déjà utilisé", code: 400};
          next(err);
      });
  } else {
    db.collection('companies').insertOne(company)
      .then((companiesResult) => {
        user.idCompany = companiesResult.insertedId;
        db.collection('users').insertOne(user)
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
  }
});

router.put('/:id', function(req, res, next) {
  delete req.body.token;
  db.collection('users').updateOne({_id: ObjectId(req.params.id)}, {$set: {...req.body, _id: ObjectId(req.params.id)}})
      .then(() => res.json({_id: req.params.id}))
      .catch(err => {
          if (err.code === 11000) err = {...err, message: "Le nom d'utilisateur est déjà utilisé", code: 400};
          next(err);
      });
});

router.post('/addAlert', function (req, res, next) {
  db.collection('users').update({
    _id: ObjectId(req.body["user"]["_id"])
  }, {
    $set: {
      filterAlert: req.body["filter"],
    }
  });
});

router.post('/clearNotifications', function (req, res, next) {
  console.log("Request /users/clearNotifications")
  console.log(req.body["user"]["notifications"])
  db.collection('users').update({
    _id: ObjectId(req.body["user"]["_id"])
  }, {
    $set: {
      notifications: req.body["user"]["notifications"],
    }
  });
  res.json(req.body);
});

module.exports = router;

async function toAuthenticate({username, password}) {
  let user = await db.collection('users').findOne({ username });
  if (!user) throw({message: "username incorrect", code: 400});
  if (!user.isStudent) {
    const company = await db.collection('companies').findOne({ _id: ObjectId(user.idCompany) });
    user = {...user, ...company};
  }
  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithoutHash } = user;
    const token = jwt.sign({ sub: user.id }, config.secret);
    return { ...userWithoutHash, token };
  }
}

function splitUserCompany(body) {
  let user, company = {};
  const {firstName, name, username, password, dateBirth, email, creationDate, telephone, isStudent, description, taille, location, srcImage} = body;
  user = {name, username, isStudent};
  user.creationDate = Date.now();
  user.hash = bcrypt.hashSync(password, 10);
  if (user.isStudent) {
    user = {...user, firstName, email, telephone};
    user.dateBirth = dateBirth.substring(0,10);
  } else {
    company = {name, description, taille, location, srcImage};
    company.creationDate = creationDate.substring(0,10);
  }
  return {user, company};
}
