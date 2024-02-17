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


// app.get('/', (req, res, next) => {
  
//   //res.send(req.body.extracted_data);
//   next()
// })
app.use('/top', clash_data);
//works :)
app.get('/top', async (req, res, next) => {
  let set_session_id = req.body.extracted_data[0].battle_time;
    const row = await database.check_add_update("Test_4", 'ox_test', set_session_id, 1000, null);
    const new_value = await database.read_record("Test_4", "ox_test", set_session_id, null);
    res.send(new_value);
})

//app.use(return_top_ten);


app.listen(port, () => {
    console.log('Listening on port 8080')
})


