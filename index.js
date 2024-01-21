//This is going to be the server :)
const express = require('express');
const database = require('./sqlite3_helper.js');
const clash_data = require('./clash_data.js');
const app = express();
const port = 8080

app.get('/', (req, res, next) => {
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
app.use('/', clash_data);

app.get('/', (req, res, next) => {
  //console.log(req.body.clash_royal_data[0])
  //res.send(req.body.clash_royal_data[0].arena);//req.body.clash_royal_data);
  res.send("Maybe this time?")
})

//works :)
// return_top_ten.get('/top', async (req, res, next) => {
//     const row = await database.read_record("Test_1", 'ox_test', '1');
//     res.send(row);
//     next()
// })

//app.use(return_top_ten);


app.listen(port, () => {
    console.log('Listening on port ${port}')
})


