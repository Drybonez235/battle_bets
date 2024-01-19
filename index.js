//This is going to be the server :)
const express = require('express');
const database = require('./sqlite3_helper.js');
const app = express();
const port = 8080

const get_player_data = express.Router();
const set_session_id = express.Router();
const return_top_ten = express.Router();

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

get_player_data.get('/get_player_data', (req, res, next) => {
    const token = "Bearer ";
    const api_url_begin = "api.clashroyale.com";
    const api_url_end = "/v1/players/%23" + req.body.player_id  + "/battlelog";
    const options = {
        hostname: api_url_begin,
        path: api_url_end,
        method: 'GET',
        headers: {
          Authorization: token,
          ContentType: 'application/json'}
      };
      https.get(options, response => {
        https.get(options, response => {
            let data = "";
            resp.on("data", chunk => {
              data += chunk;
            });
            response.on("end", () => {
              req.body['Clash_Royal_Data'] = JSON.parse(data);
                next();
            });
          })
          .on("error", err => {
            console.log("Error: " + err.message);
          });  
      })
})

set_session_id.get('/set_session_id', (req, res, next) => {

})
//works :)
return_top_ten.get('/top', async (req, res, next) => {
    const row = await database.read_record("Test_1", 'ox_test', '1');
    res.send(row);
    next()
})

app.use(get_player_data);
app.use(return_top_ten);
app.use(set_headers);


app.listen(port, () => {
    console.log('Listening on port ${port}')
})


