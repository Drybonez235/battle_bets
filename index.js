//This is going to be the server :)
const express = require('express');
const database = require('./sqlite3_helper.js');
const app = express();
const port = 8080

const return_top_ten = express.Router();

//works :)
app.get('/', async (req, res, next) => {
    const row = await database.read_record("Test_1", 'ox_test', '1');
    res.send(row);
    next()
})



app.listen(port, () => {
    console.log('Listening on port ${port}')
})


