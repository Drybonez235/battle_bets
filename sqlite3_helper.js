//This is going to be the database class... 
const fs = require('fs');
const sqlite3 = require("sqlite3").verbose();
const filepath = "./sqlite_db/database.db";

function createDbConnection() {
    if (fs.existsSync(filepath)) {
        const db = new sqlite3.Database(filepath);
        return db;
    } else {
        //createTable();
    };
}

function createTable_leaderboard() {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(filepath);
        db.run("CREATE TABLE leaderboard (ID INTEGER PRIMARY KEY, user_name VARCHAR(50), streamer_id VARCHAR(12), session_id INTEGER, total_points INTEGER)"
            , [] , function (err) {
                if (err != null) {
                    reject(err);
                } else {
                    resolve();
                }
            })
    })
}
function createTable_battle_data(){
    return new Promise((resolve, reject) =>{
        const db = new sqlite3.Database(filepath);
        db.run("CREATE TABLE battle_data (battle_time INTEGER, streamer_id VARCHAR(12), opponent_name VARCHAR(20), crowns_taken INTEGER, crowns_lost INTEGER)"
        , [], function(err){
            if (err != null) {
                reject(err);
            } else{
                resolve();
            }
        })
    })
}

function add_row_battle_data(battle_time, streamer_id, opponent_name, crowns_taken, crowns_lost){
    return new Promise((resolve, reject) => {
        const db = createDbConnection();
        db.run("INSERT INTO battle_data (battle_time, streamer_id, opponent_name, crowns_taken, crowns_lost) VALUES($battle_time_, $streamer_id_, $opponent_name_, $crowns_taken_, $crowns_lost_)"
        , {
            $battle_time_: battle_time,
            $streamer_id_: streamer_id,
            $opponent_name_: opponent_name,
            $crowns_taken_: crowns_taken,
            $crowns_lost_: crowns_lost
        }, function(err) {
            if (err != null) {
                reject(err);
            } else {
                resolve();
            }
        })
    })
}
function get_new_battle_data(last_refresh_time, streamer_id){
    return new Promise((resolve, reject) => {
        const db = createDbConnection();
        db.all("SELECT * FROM battle_data WHERE streamer_id = $streamer_id_ AND battle_time >= $last_refresh_time_ ORDER BY battle_time DESC", 
        {
            $last_refresh_time_: last_refresh_time,
            $streamer_id_: streamer_id 
        }, function(err, rows) {
            if (err != null){
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}
function add_row(user_name, total_points, streamer_id, session_id) {
    return new Promise((resolve, reject) => {
        const db = createDbConnection();
        db.run("INSERT INTO leaderboard (user_name, total_points, streamer_id, session_id) VALUES($user_name_, $total_points_, $streamer_id_, $session_id_)"
            , {
                $user_name_: user_name,
                $total_points_: total_points,
                $streamer_id_: streamer_id,
                $session_id_: session_id
            }, function (err) {
                if (err != null) {
                    reject(err)
                } else {
                    resolve();
                }
            })
    });
}

function check_add_update(user_name, streamer_id, session_id, total_points) {
    return new Promise((resolve, reject) => {
        const db = createDbConnection();
        db.all("SELECT 1 FROM leaderboard WHERE user_name = $user_name_ AND session_id = $session_id_ AND streamer_id = $streamer_id_",
            {
                $user_name_: user_name,
                $session_id_: session_id,
                $streamer_id_: streamer_id
            }, async function (err, rows) {
                if (err != null) {
                    reject(err);
                } else {
                    if (rows.length === 0) {
                        await add_row(user_name, streamer_id, session_id, total_points).then(function () {
                            resolve();
                        });
                    } else {
                        await update_row(user_name, streamer_id, session_id, total_points).then(function () {
                            resolve();
                        });
                    }
                }
            });
    });
}

function update_row(user_name, streamer_id, session_id, total_points) {
    return new Promise((resolve, reject) => {
        const db = createDbConnection();
        db.run("UPDATE leaderboard SET total_points = $total_points_ WHERE user_name = $user_name_ AND session_id = $session_id_ AND streamer_id = $streamer_id_",
            {
                $total_points_: total_points,
                $user_name_: user_name,
                $session_id_: session_id,
                $streamer_id_: streamer_id
            }, function (err) {
                if (err != null) {
                    reject(err)
                } else {
                    resolve();
                }
            });
    });
}

function read_record(user_name, streamer_id, session_id) {
    return new Promise((resolve, reject) => {
        const db = createDbConnection();
        db.all("SELECT user_name, streamer_id, session_id, total_points FROM leaderboard WHERE user_name = $user_name_ AND streamer_id = $streamer_id_ AND session_id = $session_id_"
            , {
                $user_name_: user_name,
                $streamer_id_: streamer_id,
                $session_id_: session_id
            }, function (err, rows) {
                if (err != null) {
                    reject(err);
                 } else { 
                    resolve(rows);
                }
            })
    })
}

function read_table(table_name) {
    return new Promise((resolve, reject) => {
        const db = createDbConnection();
        const sql = "SELECT * FROM " + table_name;
        db.all(sql
            , [] , function (err, rows) {
                if (err != null) {
                    reject(err);
                 } else {
                    console.log(rows) 
                    resolve();
                }
            })
    })
}

function get_top_ten(streamer_id, session_id) {
    return new Promise((resolve, reject) => {
        const db = createDbConnection();
        db.all("SELECT user_name, total_points, session_id FROM leaderboard WHERE (streamer_id = $streamer_id_ AND (session_id <= ($session_id_ + 28800000) AND session_id >= ($session_id_ - 28800000))) LIMIT 10",
        {
            $streamer_id_: streamer_id,
            $session_id_: session_id
        }, function (err, rows) {
            if (err != null) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}

module.exports = {
    createDbConnection,
    read_record,
    check_add_update,
    add_row,
    update_row,
    createTable_leaderboard,
    get_top_ten,
    add_row_battle_data,
    get_new_battle_data,
    createTable_battle_data,
    read_table
}
