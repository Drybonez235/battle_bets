const database = require('./sqlite3_helper.js');

const first = async () => {
    await database.check_add_update("lydia", "OX", "1234", 500);
    await database.read_record("lydia", "OX", "1234").then(function(value){console.log(value)});
}

first();
//database.add_row("lydia", "OX", "2002", 500);

//database.check_add_update("lydia", "OX", "2002", 1000);
//database.add_row("drybonez", "OX", "10011").then(hmm());




