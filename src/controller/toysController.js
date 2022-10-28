const router = require('express').Router();

const toysServices = require('../services/toysServices');

router.get('/catalog', (req, res) => {
    const getToys = toysServices.getAll();
    res.render('toys/catalog', { getToys });
})

module.exports = router;