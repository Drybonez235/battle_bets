const https =  require("https");
const express = require('express');
const router = express.Router();
//const app = express();

router.use(express.json());
//router.use(express.urlencoded({ extended: true }));
router.get('/', (req, response, next) => {
    const token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImNhNTA1MGUyLTFmZDQtNGFkYy1hYTZhLTY5MTE3OGE5NzU0ZiIsImlhdCI6MTcwNDc3MjgyNywic3ViIjoiZGV2ZWxvcGVyL2IyNzdhNGUwLTcxMjUtNzZlYi0yNmViLTIzMjAwMGQzN2QzYSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI3My4yMTEuOTAuMjI2Il0sInR5cGUiOiJjbGllbnQifV19.9wNx2GpaMh9lt9a5gqz4zXzaF0EFxVw_Sou5IKWbNrJNKqPOJRfslkwq6HHGDFJDXvklFCVbgwuSD12WlJk09Q";
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
            next();
            //return req;
        });
    })
        .on("error", err => {
            return err.message;
        });
})

const extract_data = (req, res, next) => {
    let battle_bet_data = {};
    let win_total = 0;
    let game_total = 0;
    
    //Start time is the time the first call is made. Any game before start time will not count.
    let start_time = 202401183519//req.body.start_time;
    //last refresh time is the last time a call was made subtracting 6 minutes. The reason it subtracts is because a game length
    //is up to 6 minutes long and any game played between start time and last call time needs to be captured.
    let last_refresh_time =   start_time-500//req.body.last_refresh_time - 500;
   // console.log("start time from website: " + req.body.start_time)
    //console.log("last refresh time from website: " + req.body.last_refresh_time)
    
    //This logic goes through the 25 records in the json file. If the game time is greater then start time and greater then last refresh time, then it counts as a game.
    for (let i=0; i < 25; i++){
        let game_data = {}
        let current_record = req.body.clash_royal_data[i];
        let your_crowns = current_record.team[0].crowns;
        let opponent_crowns = current_record.opponent[0].crowns;
        let battle_time = current_record.battleTime.replaceAll( "T" , "" ).slice(0, 14);
        
        if((start_time <= battle_time) && (last_refresh_time <= battle_time)){
            game_total += 1;
            game_data["blue_crowns"] = your_crowns;
            game_data["red_crowns"] = opponent_crowns;
            //console.log("This should only happen 1-2 times per call")
            //This if statement checks the number of crowns. If you you had more crowns then your opponent, a win is added.
            if(your_crowns > opponent_crowns){
                win_total += 1
                }//end of win in
            }//end of time match if statment
            else{
              break
            }
        }//end of the for loop
    //the server sends back a json response with win total and game total. These numbers are added to the website.
    //res.send({ wins: win_total, games : game_total})
    next();
}
router.use(extract_data);

module.exports = router;