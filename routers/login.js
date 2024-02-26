const Router = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const generatorToken = require('../services/token');
const router = Router();

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login',
        isLogin: true,
        loginError: req.flash('loginError')
    })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        req.flash('loginError', 'The login or password is incorrect');
        res.redirect('/login');
        return; 
    }

    try {
        const borUser = await User.findOne({ email });
        

        if (!borUser) {
            req.flash('loginError', 'User not found');
            res.redirect('/login');
            return; 
        }

        const borPassword = await bcrypt.compare(password, borUser.password);

        const tokin = generatorToken(borUser._id, borPassword._id);

        res.cookie('token', tokin, {httpOnly: true, secure: true});
        if (borPassword) {
            res.redirect('/authIndex');
        } else {
            req.flash('loginError', 'Incorrect password');
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Error during login:', error);
        req.flash('loginError', 'An unexpected error occurred');
        res.redirect('/login');
    }
});


module.exports = router;