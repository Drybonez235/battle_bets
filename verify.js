const manage = require('./manage_clash_data.js');
const database = require('./sqlite3_helper.js');

const express = require('express');
const router = express.Router();

const varify_player_id = async (req, res, next) => {
    res.set({'Content-Type' : 'application/json',
    'Access-Control-Allow-Origin' : "*", 
    'Access-Control-Request-Headers': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': "OPTIONS, POST, GET"});
    // if(req.method == "OPTIONS") {
    //     res.sendStatus(200);
    //     }
    console.log("We are at least hitting varify player Id Server Side");
    const streamer_id = req.body.streamer_id;
    await manage.varify_player_id(streamer_id).then(function(value){
        console.log(value.name);
        if(value.reason == "notFound"){
            req.body["status"] = 1;
            res.json(req.body);
        } else {
            req.body["status"] = 0;
            req.body["clash_royal_user_name"] = value.name;
            console.log(req.body);
            next()
        }
    });
}

const top_ten_win = async (req, res) => {
    let date = new Date();
    let UTC_string = date.toISOString();
    let UTC_milli = Date.UTC(UTC_string.slice(0,4), UTC_string.slice(5,7)-1, UTC_string.slice(8,10), UTC_string.slice(11,13), UTC_string.slice(14,16),UTC_string.slice(17,19), UTC_string.slice(20,23));
    await database.get_all_games(req.body.streamer_id, UTC_milli).then(function(value){
        if(value.length == 0){
            req.body["past_battle_results"] = [{"crowns_taken": 0, "crowns_lost":0}];
            res.json(req.body)
        } else {
            req.body["past_battle_results"] = value;
            res.json(req.body);
        }
    })

}

router.use("/", [varify_player_id, top_ten_win]);

module.exports = router;