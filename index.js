//This is going to be the server :)
const express = require('express')
const database = require('./sqlite3_helper.js')
const db = database.createDbConnection()  
const app = express()
const port = 8088

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log('Listening on port ${port}')
    database.add_row(db)
    database.read_record(db)
})