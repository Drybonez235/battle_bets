//This is going to be the server :)
const express = require('express');
// const database = require('./sqlite3_helper.js');
// const manage = require('./manage_clash_data.js');
const middleware = require('./middleware.js');
const verify = require('./verify.js');
const app = express();
const port = 8080;

app.all('/', (req, res, next) => {
    res.set({'Content-Type' : 'application/json',
    'Access-Control-Allow-Origin' : "*", 
    'Access-Control-Request-Headers': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': "OPTIONS, POST, GET"});
    
    //This if statment deals with the preflight request and returns 200
    if ('OPTIONS' === req.method) {
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
    console.log('Listening on port 8080')
})


