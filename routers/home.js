const Router = require('express');
const Product = require('../models/Product');

const router = Router();

router.get('/', async (req, res) => {
    let product = await Product.find().lean();

    res.render('index', {
        title: 'Home',
        isHome: true,
        product: product
    });
})


module.exports = router;