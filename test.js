const database = require('./sqlite3_helper.js');

const first = async () => {
    //await database.createTable();
    await database.check_add_update("lydia", "OX", "1234", 1000);
    await database.read_record("lydia", "OX", "1234").then(function(value){console.log(value)});
};

const top_ten = async () => {
    console.log("Is this workingf?");
    await database.read_top_ten("OX", "1234").then(function(value){console.log(value)});
};

//database.read_top_ten();
top_ten();
// for(let i = 0; i < 10; i++){
//     let value = 100;
//     database.check_add_update("lydia", "OX", "1234", value); 
//     value += 100;
// }




