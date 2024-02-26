const Router = require('express');
const Product = require('../models/Product');

const router = Router();

router.get('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Product.findById(id).lean();

        if (!book) {
            return res.status(404).send("Kitob topilmadi");
        }

        res.render('book', {
            book: book
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server xatosi");
    }
});

module.exports = router;
