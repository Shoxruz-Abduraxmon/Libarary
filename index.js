const express = require('express');
const expHbs = require('express-handlebars');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cookie = require('cookie');
const dotenv = require('dotenv');

dotenv.config();

const routerHome = require('./routers/home');
const routerLogin = require('./routers/login');
const routerRegister = require('./routers/register');;
const routerAdd = require('./routers/add');
const routerMundarija = require('./routers/mundarija');
const routerBook = require('./routers/book');
const routerEdit = require('./routers/edit');
const routerAuthIndex = require('./routers/authIndex');
const adminMiddleware = require('./routers/admin');

const app = express();


app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({secret: "Shox", resave: false, saveUninitialized: false}));
app.use(flash());
app.use(cookieParser())

const hbs = expHbs.create({
    extname: '.hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(routerHome);
app.use(routerLogin);
app.use(routerRegister);
app.use(routerAdd);
app.use(routerMundarija);
app.use(routerBook);
app.use(routerEdit); 
app.use(routerAuthIndex);   
app.use(adminMiddleware);

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false,)
        mongoose.connect(process.env.MONGO_URI)
        console.log('Mongo connected');

        const PORT = process.env.PORT || 2024

        app.listen(PORT, () => {
        console.log(`localhost: ${PORT}`);
})

    } catch (error) {
        console.log(error)
        process.exit()
    }
}

connectDB()

