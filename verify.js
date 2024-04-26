const manage = require('./manage_clash_data.js');

const express = require('express');
const router = express.Router();

const varify_player_id = async (req, res) => {
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
            res.json(req.body);
        }
    });
}

router.use("/", varify_player_id);

module.exports = router;