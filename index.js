//This is going to be the server :)
const express = require('express')
const database = require('./sqlite3_helper.js')
const db = database.createDbConnection()  
const app = express()
const port = 8088

//app.get('/', (req, res, next) => {
//    res.send('Hello World!');
//    next();
//})

const add_row_express = () => {
    database.add_row(db, 'Drybonez', 500, "09/01/2023", "Streamer_ID", "Sessions_number2");
};
const read_row_express =  ()=> {
    database.read_record(db);
    
};

app.listen(port, () => {
    console.log('Listening on port $port', {port})
    //database.read_record(db)
})
//app.use(const db = database.createDbConnection())
app.use(add_row_express)
app.use(read_row_express)

await add_row_express();
read_row_express()
