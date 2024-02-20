//This is going to be the database class... 
const fs = require('fs')
const sqlite3 = require("sqlite3").verbose();
const filepath = "./sqlite_db/database.db";

function createDbConnection() {
    if (fs.existsSync(filepath)) {
        const db = new sqlite3.Database(filepath);
        return db;
    } else {
       return console.log("THER IS NO DATABASE");
    };
}

function createTable() {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(filepath);
        db.run(
            `CREATE TABLE leaderboard (
                ID INTEGER PRIMARY KEY,
                user_name VARCHAR(50),
                total_points INTEGER,
                streamer_id VARCHAR(12),
                session_id VARCHAR(20));`
            , [], function (err) {
                if (err != null) {
                    console.log("error");
                    reject(err);
                } else {
                    console.log("No Error and it didn't exist");
                    resolve(db);
                }
            })
    })
}

function add_row(user_name, streamer_id, session_id, points) {
    return new Promise((resolve, reject) => {
        const db = createDbConnection();
        db.run("INSERT INTO leaderboard (user_name, total_points, streamer_id, session_id) VALUES($user_name_, $points_, $streamer_id_, $session_id_)"
            , {
                $user_name_: user_name,
                $points_: points,
                $streamer_id_: streamer_id,
                $session_id_: session_id
            }, function (err) {
                if (err != null) {
                    reject(err)
                } else {
                    console.log("We made a row");
                    resolve();
                }
            })
    });
}

async function check_add_update(user_name, streamer_id, session_id, total_points) {
    return new Promise(async (resolve, reject) => {
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
                        if (rows[0]["1"] == 1) {
                            await update_row(user_name, streamer_id, session_id, total_points).then(resolve());
                        } else {
                            await add_row(user_name, streamer_id, session_id, total_points).then(resolve());
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
                    console.log("We updated a row");
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
                    console.log("We read a row");
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
    createTable
}
