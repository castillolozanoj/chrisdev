const express = require ('express');
const app = new express();
const path = require ('path');
const exphbs = require ('express-handlebars');
const morgan = require ('morgan');

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
app.use(morgan('dev'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//routes
app.use(require('./routes/index'));

//statics files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;