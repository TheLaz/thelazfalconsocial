var router = require('express').Router();
var store = require('../stores/publishing/publishers');

router.get('/items', function(req, res, next) {
    try {
        res.json(store.getAll());
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.post('/create', function(req, res, next) {
    try {
        store.create(req.body);
        res.status(201).send(req.body);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.delete('/remove/:publisherId', function(req, res, next) {
    try {
        store.remove(req.params.publisherId);
        res.status(201).send(req.params.publisherId);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.put('/update', function(req, res, next) {
    try {
        store.update(req.body);
        res.status(201).send(req.body);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = router;
