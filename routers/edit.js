const Router = require('express');
const Product = require('../models/Product');

const router = Router();

router.get('/edit/:id', async (req, res) => {
    try{
    const id = req.params.id;
    const edit = await Product.findById(id).lean();

    if(!edit) {
        res.status(404).send('Editga o`ta olmadi')
    }
    res.render('edit', {
        edit: edit
    });
    
    } catch (err) {
        console.log(err);
        res.status(500).send('Edit getda nosozlik');
    }
});

router.post('/edit/:id', async(req, res) => {
    try{
    const {bookImg, bookName, bookOwner, bookInfo, bookFuulInfo} =req.body;
    const id = req.params.id;

    const ediit = await Product.findByIdAndUpdate(id, req.body, {new: true});
    console.log(ediit);
    res.redirect('/');
    } catch (err) {
        console.log(err);
        res.status(500).send('Edit postda nosozlik');
    }
});

router.post('/delite/:id', async (req, res) => {
    try{
    const id = req.params.id;

    await Product.findByIdAndDelete(id);
    res.redirect('/');
  }catch (err) {
    console.log(err);
    res.status(500).send("delite da nosozlik")
  }
})

module.exports = router;