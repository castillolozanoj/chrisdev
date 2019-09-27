const express = require ('express');
const app = new express();
const path = require ('path');
const exphbs = require ('express-handlebars');
const morgan = require ('morgan');
const favicon = require('serve-favicon');
const helmet = require ('helmet');
var http = require('http').createServer(app);;
var express_enforces_ssl = require('express-enforces-ssl');
const hostValidation = require('host-validation');




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
//app.use(express_enforces_ssl());
app.use(helmet());
app.use(morgan('dev'));
app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));
app.use(hostValidation({ hosts: ['127.0.0.1:8080',
                                 `localhost:${app.get('port')}`,
                                 '7264175a.ngrok.io', 
                                 /.*\.chrisweb\.me$/] }))

  

//routes
app.use(require('./routes/index'));


//statics files
app.use(express.static(path.join(__dirname, 'public')));

//404
app.use((req,res,next)=>{
    res.status(400).sendFile(path.join(__dirname, 'public','404.html'));
});

// Unhandled errors (500)
app.use(function(err, req, res, next) {
    console.error('An application error has occurred:');
    console.error(err);
    console.error(err.stack);
    res.status(500).sendFile(path.join(__dirname, 'public', '500.html'));
});

module.exports = {app, http};