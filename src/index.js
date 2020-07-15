require ('dotenv').config();
const {app, http} = require ('./app.js');

async function Main(){

    try {
   await http.listen(app.get('port'));
   console.log(`Server running on http://localhost:${app.get('port')}`);
    } catch (err){
        console.log(err);
        process.exit(1);
    } 

};


Main();
