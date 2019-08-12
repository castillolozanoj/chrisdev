const app = require ('./app.js');

async function main(){

    try {
   await app.listen(app.get('port'));
   console.log(`Server running on http://localhost:${app.get('port')}`);
    } catch (err){
        console.log(err);
        process.exit(1);
    } 

};


main();
