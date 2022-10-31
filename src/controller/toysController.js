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
        res.render('toys/create', { error: error.message});
    }
});

router.get('/:toyId/details', async (req, res) => {
    let toy = await toysServices.getOne(req.params.toyId);

    let toyData = await toy.toObject();

    let isOwner = toyData.owner == req.user?._id;
    let buyer = toy.getBuying();

    let isBought = req.user && buyer.some(c => c._id == req.user?._id);

    res.render('toys/details', { ...toyData, isOwner, isBought });
});

router.get('/:toyId/buy', async (req, res) => {
    const toyId = req.params.toyId
    let toy = await toysServices.getOne(toyId);

    toy.buyingList.push(req.user._id);
    await toy.save();
    res.redirect(`/toys/${req.params.toyId}/details`);
});

router.get('/:toyId/edit', async (req, res) => {
    const toyId = req.params.toyId
    let toy = await toysServices.getOne(toyId);
    res.render('toys/edit', { ...toy.toObject() })
});

router.post('/:toyId/edit', async (req, res) => {
    try {
        const toyId = req.params.toyId;
        const toyData = req.body;
        await toysServices.update(toyId, toyData);
        res.redirect(`/toys/${toyId}/details`);
    } catch (error) {
        res.render('toys/edit', { error: error.message})
    }

});

router.get('/:toyId/delete', async (req, res) => {
    const toyId = req.params.toyId;
    await toysServices.delete(toyId);
    res.redirect('/toys/catalog');
});

router.get('/search', async (req, res) => {
    let toyTitle = req.query.toyTitle;
    let toyCharity = req.query.toyCharity;

    let toy = await toysServices.search(toyTitle, toyCharity);

    if(toy == undefined) {
        toy = await toysServices.getAll();
    }

    res.render('toys/search', {toy});
})


module.exports = router;