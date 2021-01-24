const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json({limit: '16mb'}));
const ObjectId = require('mongodb').ObjectId

router.get('/:id', function (req, res, next) {
    let chunks = [];
    let document = {};
    const downloadStream = gridFSBucket.openDownloadStream(ObjectId(req.params.id));
    downloadStream.on('file', (file) => {
        document._id = file._id;
        document.name = file.filename;
    });
    downloadStream.on('data', data => {
        chunks.push(data);
    });
    downloadStream.on('end', () => {
        let buffer = Buffer.concat(chunks);
        document.base64Data = buffer.toString();
        res.json(document);
    });
    downloadStream.on('error', next);
});

router.post('/', function (req, res, next) {
    const uploadStream = gridFSBucket.openUploadStream(req.body.name);
    uploadStream.end(req.body.base64Data);
    uploadStream.on('finish', () => {
        res.json(uploadStream.id);
    });
    uploadStream.on('error', next);
});

router.put('/:id', function (req, res, next) {
    gridFSBucket.delete(ObjectId(req.params.id), (error) => {
        if (error) { next(error) }
        else {
            const uploadStream = gridFSBucket.openUploadStreamWithId(ObjectId(req.params.id), req.body.name);
            uploadStream.end(req.body.base64Data);
            uploadStream.on('finish', () => {
                res.json(uploadStream.id);
            });
            uploadStream.on('error', next);
        }
    });
});

router.delete('/:id', function (req, res, next) {
    gridFSBucket.delete(ObjectId(req.params.id), (error) => {
        if (error) { next(error) }
        else { res.json() }
    });
});

module.exports = router;
