const Router = require('express');

const router = Router();

router.get('/Mundarija', (req, res) => {
    res.render('mundarija', {
        title: 'Mundarija',
        isMundarija: true
    });
})

module.exports = router;