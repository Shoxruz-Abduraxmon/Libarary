const Router = require('express');
const Product = require('../models/Product');

const router = Router();

router.get('/add', async (req, res) => {

    res.render('add', {
        title: 'Add book',
        isAdd: true
    });
});

router.post('/add', async (req, res) => {
    const {bookImg, bookName, bookOwner, bookInfo} = req.body;

    const product = await Product.create(req.body);

    console.log(product);
    res.redirect('/');
})

module.exports  = router;