const Router = require('express');
const router = Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const generatorToken = require('../services/token');

router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register',
        isRegister: true,
        registerError: req.flash('registerError')
    });
});

router.post('/register', async (req, res) => {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        req.flash('registerError', 'Fill in all the lines');
        res.redirect('/register')
        return
    }
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const userData = {
            name: req.body.name, 
            email: req.body.email, 
            password: hashedPassword
        }
        const user = await User.create(userData);
        const tokin = generatorToken(user._id);

        res.cookie('token', tokin, {httpOnly: true, secure: true});
        res.redirect('/login');

    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
})

module.exports = router;
