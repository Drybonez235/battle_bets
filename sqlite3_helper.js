//This is going to be the database class... 
const fs = require('fs')
const sqlite3 = require("sqlite3").verbose();
const filepath = "./sqlite_db/database.db";

function createDbConnection() {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(filepath)) {
            db = new sqlite3.Database(filepath);
            resolve(db);
        } else {
            const db = new sqlite3.Database(filepath, (error) => {
                if (error) { reject(error);}
                db.run(`CREATE TABLE leaderboard (
                    ID INTEGER PRIMARY KEY,
                    user_name VARCHAR(50),
                    total_points INTEGER,
                    streamer_id VARCHAR(12),
                    session_id VARCHAR(20));`);
                    console.log("We did this before we crashed.")
                    resolve(db);   
            });
        }
    });
}

async function add_row(user_name, streamer_id, session_id, points, db_connection) {
    //return new Promise((resolve, reject) => { 
    if (db_connection != null) {
        const db = db_connection;
    } else {
        const db = await createDbConnection();
    }
    db.run(`INSERT INTO leaderboard (user_name, total_points, streamer_id, session_id) VALUES($user_name_, $points_, $streamer_id_, $session_id_)`
        , {
            $user_name_: user_name,
            $points_: points,
            $streamer_id_: streamer_id,
            $session_id_: session_id
        }, function (err) {
            if (err != null) {
                //resolve()
            } else {
                //reject(err);
            }
        })
    db.close();
    //})
}

function check_add_update(user_name, streamer_id, session_id, total_points, db_connection) {
    return new Promise(async (resolve, reject) => {
        if(db_connection != null){
            const db = db_connection; 
        } else {
            const db = createDbConnection();
        } 
        db.all('SELECT * FROM leaderboard WHERE user_name = $user_name_',
            {
                $points_: total_points,
                $user_name_: user_name,
                $session_id_: session_id,
                $streamer_id_: streamer_id
            }, function (err, rows) {
                if (err != null) {
                    if (rows != null) {
                        console.log(rows);
                        update_row(user_name, streamer_id, session_id, total_points, db);
                    } else {
                        console.log(rows);
                        console.log("There was no rows... Supposibly");
                        add_row(user_name, streamer_id, session_id, total_points, db);
                    }
                    resolve();
                } else {
                    reject(err)
                }
            });
    });
}

function update_row(user_name, streamer_id, session_id, total_points, db_connection) {
    //return new Promise((resolve, reject) => {
    if (db_connection != null) {
        const db = db_connection;
    } else {
        const db = createDbConnection();
    }
    db.run(`UPDATE leaderboard SET total_points = $points_ WHERE (user_name = $user_name_ AND session_id = $session_id_ AND streamer_id = $streamer_id_);`,
        {
            $points_: total_points,
            $user_name_: user_name,
            $session_id_: session_id,
            $streamer_id_: streamer_id
        }, function (err) {
            if (err != null) {
                //resolve()
            } else {
                //reject(err);
            }
        });
    db.close();
    //});
}

function read_record(user_name, streamer_id, session_id, db_connection) {
    return new Promise((resolve, reject) => {
        if (db_connection != null) {
            const db = db_connection;
        } else {
            const db = createDbConnection();
        }
        db.all('SELECT user_name, total_points, session_id FROM leaderboard WHERE user_name = $user_name_ AND streamer_id = $streamer_id_ AND session_id = $session_id_',
            {
                $user_name_: user_name,
                $session_id_: session_id,
                $streamer_id_: streamer_id
            },
            (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                    db.close();
                }
            })
    })
}

function promise_read_top_ten(session_id, streamer_id, db_connection) {
    return new Promise((resolve, reject) => {
        if (db_connection != null) {
            const db = db_connection;
        } else {
            const db = createDbConnection();
        }
        const return_data = [];
        //This is sql statment
        db.each(`SELECT user_name, total_points FROM leaderboard WHERE session_id = $session_id_ AND streamer_id = $streamer_id_ ORDER BY total_points DESC LIMIT 10`,
            //This is the parameters
            {
                $session_id_: session_id,
                $streamer_id_: streamer_id
            },
            //This is the callback
            (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    return_data.push(rows);
                }
            },
            //this is on completion.
            (err, n) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(return_data)
                }
                //end of db.each stamtent   
            });
        //end of promise
    });
    //end of function.
}

function promise_read_top_ten_all(session_id, streamer_id, db_connection) {
    return new Promise((resolve, reject) => {
        if (db_connection != null) {
            const db = db_connection;
        } else {
            const db = createDbConnection();
        }
        //This is sql statment
        db.all(`SELECT user_name, total_points FROM leaderboard WHERE session_id = $session_id_ AND streamer_id = $streamer_id_ ORDER BY total_points DESC LIMIT 10`,
            //This is the parameters
            {
                $session_id_: session_id,
                $streamer_id_: streamer_id
            },
            //This is the callback
            (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        //end of promise
    });
    //end of function.
}

module.exports = {
    createDbConnection,
    read_record,
    check_add_update,
    add_row,
    update_row,
    promise_read_top_ten,
    promise_read_top_ten_all
}
