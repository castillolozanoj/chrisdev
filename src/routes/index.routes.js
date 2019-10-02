const {Router} = require ('express');
const route = Router();
const nodemailer = require('nodemailer');
const {check,validationResult}= require ('express-validator');

const Val = [ check('email').isEmail(), check('name').isLength({ min: 10 }), check('msg').isLength({ min: 10 })];

route.get('/', (req,res)=>{
    res.render('index', {
        title: 'Christian Castillo DevWeb'
    });
});

route.get('/projects',(req,res)=>{
    res.render('templates/projects');
});

route.get('/aboutMe', (req,res)=>{
    res.render('templates/profile');
});

route.post('/aboutMe',Val, (req,res)=>{
    try {
        validationResult(req).throw();

      } catch (err) {
        console.log(err.array());
        const e= err.array();
        
        res.render('templates/profile', {
            e
        })
       
      }
})

route.get('/cv', (req,res)=>{
    res.render('templates/cv');
});






module.exports = route;