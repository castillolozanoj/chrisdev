const {Router} = require ('express');
const route = Router();

route.get('/', (req,res)=>{
    res.render('index', {
        title: 'Christian Castillo DevWeb'
    });
});

route.get('/projects',(req,res)=>{
    res.render('partials/projects');
});

route.get('/aboutMe', (req,res)=>{
    res.render('partials/profile')
});

module.exports = route;