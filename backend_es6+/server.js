import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import categorie from './routere/categorie.js';
import cautare from './routere/cautare.js';
import autentificare from './routere/autentificare.js';
import cos_router from './routere/cos_router.js';
import dashboard_admin from './routere/dashboard_admin.js';
var MongoDBStore = require('connect-mongodb-session')(session);
import path from 'path';

const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.mongodbUrl || 'mongodb://localhost:27017/bazaDeDate', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('Server conectat la mongodb.');
}).catch((error) => {
    console.log(error.reason);
});

const server = express();
server.use(express.static(path.join(__dirname, '../client', 'build')));
server.use(express.json());

const stocare_sesiuni = new MongoDBStore({
    uri: process.env.mongodbUrl,
    collection: 'sesiuni'
});
server.use(session({
    secret: process.env.sessionSecret || 'FlorinLicentaTW1335',
    resave: false,
    saveUninitialized: false,
    store: stocare_sesiuni,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}));

server.use('/db', categorie);
server.use('/cautare', cautare);
server.use('/autentificare', autentificare);
server.use('/cos', cos_router);
server.use('/dashboard_admin', dashboard_admin);

server.use((err, req, res, next)=>{
    res.send({message: err.message});
});


server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
})
server.listen(PORT, (err) => {
    if (err) 
        console.log(err.message);
    else
    console.log('Server creat pe portul ' + PORT);
});