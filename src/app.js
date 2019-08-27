const express = require ('express');
const path = require ('path');
const exphbs = require ('express-handlebars');
const morgan = require ('morgan');
const favicon = require('serve-favicon');
const helmet = require ('helmet');
var http = require('http');
var express_enforces_ssl = require('express-enforces-ssl');
const hostValidation = require('host-validation');


const app = new express();

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
    layoutsDir : path.join(app.get('views'), 'layouts'),
    partialsDir : path.join(app.get('views'), 'partials'),
    defaultLayout : 'main'
}));
app.set('view engine', 'handlebars');


//middleware
app.enable('trust proxy');
app.use(express_enforces_ssl());
app.use(helmet());
app.use(morgan('dev'));
app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));
app.use(hostValidation({ hosts: ['127.0.0.1:3000',
                                 'localhost:3000',
                                 'f834fa59.ngrok.io', 
                                 /.*\.mydomain\.com$/] }))

  

//routes
app.use(require('./routes/index'));

//statics files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = {app, http};