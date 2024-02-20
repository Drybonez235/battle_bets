const database = require('./sqlite3_helper.js');

console.log("1");
console.log("2");
console.log("3");


const first = async () => {
    await database.check_add_update("lydia", "OX", "2002", 21001);
    await database.read_record("lydia", "OX", "2002").then(
        console.log(value);
    );
}

//database.add_row("lydia", "OX", "2002", 500);

//database.check_add_update("lydia", "OX", "2002", 1000);

first();
//database.add_row("drybonez", "OX", "10011").then(hmm());




