const Router = require('express');
const Product = require('../models/Product');

const router = Router();

router.get('/authIndex', async (req, res) => {
    let product = await Product.find().lean();

    res.render('authIndex', {
        title: 'Admin',
        isHome: true,
        token: true,
        product: product
    });
})


module.exports = router;