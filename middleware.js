const manage = require('./manage_clash_data.js');
const database = require('./sqlite3_helper.js');

const express = require('express');
const router = express.Router();

const get_top_ten = async (req, res, next) => {
    res.set({'Content-Type' : 'application/json',
    'Access-Control-Allow-Origin' : "*", 
    'Access-Control-Request-Headers': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': "OPTIONS, POST, GET"});
    
    const session_id = parseInt(req.body.session_id);
    const streamer_id = req.body.streamer_id;
    const user_name = req.body.user_name;
    const points = req.body.total_points;

    await database.check_add_update(user_name, streamer_id, session_id, points);
    await database.get_top_ten(streamer_id, session_id).then(function (value) {
        if(value.length === 0){
            req.body["top_ten"] = [{"user_name": "no_one", "total_points": 0}];
            next();
        } else {
            req.body["top_ten"] = value;
            next();
        } 
    });
}

const get_database_clash_data = async (req, res, next) => {
    const streamer_id = req.body.streamer_id;
    const last_refresh_time = req.body.last_refresh_time;
    await database.get_new_battle_data(last_refresh_time, streamer_id).then(function (value){
        if(value.length === 0){
            next();
        } else {
            req.body["quary_result_count"] = value.length;
            req.body["clash_royal_data"] = value;
            res.json(req.body);
        }
    })
}

const get_new_clash_data = async (req, res, next) => {
    const streamer_id = req.body.streamer_id;
    const last_refresh_time = req.body.last_refresh_time;
    await manage.get_clash_data(streamer_id).then(async function (value) {
        await manage.add_new_battle_data(value, streamer_id, last_refresh_time).then(function (value) {
            if(value === 0){
                req.body["quary_result_count"] = 0;
                res.json(req.body);
            } else {
                next();
            }
        })
    })
}

router.use("/", [get_top_ten, get_database_clash_data, get_new_clash_data, get_database_clash_data]);

module.exports = router;