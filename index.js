//This is going to be the server :)
const express = require('express');
const database = require('./sqlite3_helper.js');
const app = express();
const port = 8088
data = [];

//app.get('/', (req, res, next) => {
//    res.send('Hello World!');
//})

const add_row_express = () => {

    database.add_row('Drybonez', 500, "Streamer_ID", "Sessions_number2");
    database.add_row('Lydia', 250, "Streamer_ID", "Sessions_number2");
    database.add_row('Stephen', 10000,"Streamer_ID", "Sessions_number2");
    database.add_row('Joshua', 3000, "Streamer_ID", "Sessions_number2");

}
const read_row_express =  ()=> {
    database.read_record();
    
}

const read_top_ten_express = (req, res, next)=> {
    data = database.read_top_ten("Sessions_number2", "Streamer_ID");
    
}

const print_data = (req, res, next)=> {
    console.log(data);
}

// app.listen(port, () => {
//     console.log('Listening on port $port', {port})
//     //database.read_record(db)
// })
//app.use(db = database.createDbConnection())
//app.use(add_row_express);
app.use(read_top_ten_express)
app.use(print_data)
//app.use(read_row_express)

//add_row_express();
//read_row_express();
read_top_ten_express();
print_data();

