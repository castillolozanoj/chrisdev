const {Router} = require ('express');
const route = Router();

route.get('/', (req,res)=>{
    res.render('index', {
        title: 'Pagina web Christian Castillo'
    });
});



module.exports = route;