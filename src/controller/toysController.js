const router = require('express').Router();

const toysServices = require('../services/toysServices');

router.get('/catalog', async (req, res) => {
    let toys = await toysServices.getAll();
    res.render('toys/catalog', { toys });
});

router.get('/create-toy', (req, res) => {
    res.render('toys/create');
});

router.post('/create-toy', async (req, res) => {
    try {
        await toysServices.create({ ...req.body, owner: req.user });
        res.redirect('/toys/catalog');
    } catch (error) {
        console.log(error);
        res.render('toys/create', error);
    }
});

router.get('/:toyId/details', async (req, res) => {
    let toy = await toysServices.getOne(req.params.toyId);

    let toyData = await toy.toObject();

    let isOwner = toyData.owner == req.user?._id;
    let buyer = toy.getBuying();
    
    let isBought = req.user && buyer.some(c => c._id == req.user?._id);

    res.render('toys/details', { ...toyData, isOwner, isBought });
})

module.exports = router;