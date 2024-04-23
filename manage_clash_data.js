const https = require("https");
const database = require('./sqlite3_helper.js');

function get_clash_data(streamer_id){
    console.log("get_clash_data fired")
    return new Promise((resolve, reject) => {
    let clash_data;
    const token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImNhNTA1MGUyLTFmZDQtNGFkYy1hYTZhLTY5MTE3OGE5NzU0ZiIsImlhdCI6MTcwNDc3MjgyNywic3ViIjoiZGV2ZWxvcGVyL2IyNzdhNGUwLTcxMjUtNzZlYi0yNmViLTIzMjAwMGQzN2QzYSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI3My4yMTEuOTAuMjI2Il0sInR5cGUiOiJjbGllbnQifV19.9wNx2GpaMh9lt9a5gqz4zXzaF0EFxVw_Sou5IKWbNrJNKqPOJRfslkwq6HHGDFJDXvklFCVbgwuSD12WlJk09Q";
    const api_url_begin = "api.clashroyale.com";
    const api_url_end = "/v1/players/%23" + streamer_id + "/battlelog"; //Change this back to req.body.player_id
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
            clash_data = JSON.parse(data);
            resolve(clash_data);
        });
    }).on("error", err => {
            reject(err.message);
        });
    })
}

//The battle time is the time the battle ended in UTC. This takes the UTC time that clash royal gives and converts it to epoch (miliseconds since 1970)
function convert_to_epoch(battle_time_string){
    console.log("convert_to_epoch fired");
    let t = battle_time_string;
    let new_time = Date.UTC(t.slice(0,4), t.slice(4,6)-1, t.slice(6,8), t.slice(9,11), t.slice(11,13), t.slice(13,15)); 
    return new_time;
}

async function add_new_battle_data(clash_data, streamer_id, last_refresh_time){
    console.log("add_new_battle_data");
    return new Promise( async (resolve, reject) => {
        //console.log(clash_data);
        for(let i=0; i<24; i++){
            let values_added = 0;
            let current_game = clash_data[i];
            //console.log(current_game);
            let battle_time = convert_to_epoch(current_game.battleTime);
            console.log(battle_time); //This isn't being converted...
        
            if(last_refresh_time <= battle_time){ //I changed this so that it would not run into time issues.
                values_added += 1;
                let crowns_lost = current_game.team[0].crowns;
                let crowns_won = current_game.opponent[0].crowns;
                let opponent_name = current_game.opponent[0].name;
                await database.add_row_battle_data(battle_time, streamer_id, opponent_name, crowns_lost, crowns_won);
            } else {
                resolve(values_added);
                return;
            }
        } 
    })
}

module.exports = {
    get_clash_data,
    add_new_battle_data,
    convert_to_epoch
}