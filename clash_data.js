const https = require("https");
const express = require('express');
const router = express.Router();
//const app = express();

router.use(express.json());
//router.use(express.urlencoded({ extended: true }));
router.get('/', (req, response, next) => {
    const token = "Bearer ";
    const api_url_begin = "api.clashroyale.com";
    const api_url_end = "/v1/players/%23" + "2VL9VP8Y0" + "/battlelog"; //Change this back to req.body.player_id
    const options = {
        hostname: api_url_begin,
        path: api_url_end,
        method: 'GET',
        headers: {
            Authorization: token,
            ContentType: 'application/json'
        }
    };
    https.get(options, res => {
        let data = "";
        res.on("data", chunk => {
            data += chunk;
        });
        res.on("end", () => {
            req.body["clash_royal_data"] = JSON.parse(data);
            //console.log(req.body.clash_royal_data);
            next();
            //return req;
        });
    })
        .on("error", err => {
            return err.message;
        });
})

const extract_data = (req, response, next) => {
    let battle_bet_data = [];

    //Start time is the time the first call is made. Any game before start time will not count.
    let start_time = 202401183519//req.body.start_time;
    let last_refresh_time = start_time - 500//req.body.last_refresh_time - 500;

    //If the last refresh time is 0, that means it is the first call. If it is the first call, I want it to return all data.
    if (last_refresh_time == -500) {
        //start_time = 0;
        //last_refresh_time = 0;
    };

    for (let i = 0; i < 25; i++) {
        let game_data = {}
        let current_record = req.body.clash_royal_data[i];
        let your_crowns = current_record.team[0].crowns;
        let opponent_crowns = current_record.opponent[0].crowns;
        let battle_time = parseInt(current_record.battleTime.replaceAll("T", "").slice(0, 14));

        if ((start_time <= battle_time) && (last_refresh_time <= battle_time)) {
            game_data["blue_crowns"] = your_crowns;
            game_data["red_crowns"] = opponent_crowns;
            game_data["battle_time"] = battle_time;
            battle_bet_data.unshift(game_data);
        } else {
            break
        }
    }
    req.body["extracted_data"] = battle_bet_data;
    next();
}
router.use(extract_data);

module.exports = router;