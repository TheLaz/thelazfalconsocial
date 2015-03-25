var router = require('express').Router();
var store = require('../stores/reach/reach');

router.get('/items', function(req, res, next) {
    try {
        res.json(store.getAll());
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.get('/fetch', function(req, res, next) {
    try {
        store.fetch();
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

module.exports = router;
