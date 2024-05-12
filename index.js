const express = require('express');
const middleware = require('./middleware.js');
const verify = require('./verify.js');
const database = require('./sqlite3_helper.js');
const app = express();
const port = 8081;

app.use('/', (req, res, next) => {
    res.set({'Content-Type' : 'application/json',
    'Access-Control-Allow-Origin' : "*", 
    'Access-Control-Request-Headers': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': "OPTIONS, POST, GET"});
    
    if (req.method == "OPTIONS") {
        res.sendStatus(200);
        }
        else {
          next();
        }
});

app.use(express.json())

app.use("/main", middleware);
app.use("/verify", verify);

app.listen(port, () => {
  database.createTable_leaderboard();
  database.createTable_battle_data();
})


