const {app, http} = require ('./app.js');

async function main(){

    try {
   await http.listen(app.get('port'));
   console.log(`Server running on http://localhost:${app.get('port')}`);
    } catch (err){
        console.log(err);
        process.exit(1);
    } 

};


main();
