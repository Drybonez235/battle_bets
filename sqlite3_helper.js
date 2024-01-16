//This is going to be the database class... 
const fs = require('fs')
const sqlite3 = require("sqlite3").verbose();
const filepath = "./sqlite_db/database.db";

function createDbConnection() {
    if(fs.existsSync(filepath)) {
        console.log("It is there an you are connected!")
        db = new sqlite3.Database(filepath);
        return db
    } else {
        const db = new sqlite3.Database(filepath, (error) => {
            if (error) {
              return console.error(error.message);
            } 
           console.log("We created the table...") 
            createTable(db);
  });
}}

function createTable() {
    db.run(`CREATE TABLE leaderboard (
        ID INTEGER PRIMARY KEY,
        user_name VARCHAR(50),
        total_points INTEGER,
        streamer_id VARCHAR(12),
        session_id VARCHAR(20)
        );
        `);
}

function add_row(user_name, points, streamer_id, session_id) {
    const db = createDbConnection();
    db.run(`
    INSERT INTO leaderboard(user_name, total_points, streamer_id, session_id) VALUES($user_name_, $points_, $streamer_id_, $session_id_);    
    `, {
        $user_name_ : user_name,
        $points_ : points,
        $streamer_id_ : streamer_id,
        $session_id_ : session_id
    })
    db.close();
}

function update_row(user_name, streamer_id, session_id, total_points){
    return new Promise((resolve, reject) => {
        const db = createDbConnection();
        db.run(`UPDATE leaderboard SET total_points = $points_ WHERE (user_name = $user_name_ AND session_id = $session_id_ AND streamer_id = $streamer_id_);`
        , {
            $points_ : total_points, 
            $user_name_ : user_name,
            $session_id_ : session_id,
            $streamer_id_ : streamer_id
        }, function (err) {
            if (err != null) {
                reject()
            } else {
                resolve(err);
            }
        });
    });
}

function read_record(user_name, streamer_id, session_id) {
    return new Promise((resolve, reject) => {
        const db = createDbConnection();
       db.all('SELECT user_name, total_points FROM leaderboard WHERE user_name = $user_name_ AND streamer_id = $streamer_id_ AND session_id = $session_id_;',
       {
        $user_name_ : user_name,
        $session_id_ : session_id,
        $streamer_id_ : streamer_id
       }, 
       (err, rows) => {
        if(err){
            reject(err);
        } else {
            resolve(rows);
        }
       }) 
    })
}

function promise_read_top_ten(session_id, streamer_id){
    return new Promise((resolve, reject) => {
        const db = createDbConnection();
        const return_data = [];
        //This is sql statment
        db.each(`SELECT user_name, total_points FROM leaderboard WHERE session_id = $session_id_ AND streamer_id = $streamer_id_ ORDER BY total_points DESC LIMIT 10;`,
        //This is the parameters
        {
        $session_id_ : session_id,
        $streamer_id_ : streamer_id
        },
        //This is the callback
         (err, rows)=>{
            if(err){
                reject(err);
            } else{
            return_data.push(rows);
            }
        },
        //this is on completion.
         (err, n) => {
            if(err){
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

function promise_read_top_ten_all(session_id, streamer_id){
    return new Promise((resolve, reject) => {
        const db = createDbConnection();
        //This is sql statment
        db.all(`SELECT user_name, total_points FROM leaderboard WHERE session_id = $session_id_ AND streamer_id = $streamer_id_ ORDER BY total_points DESC LIMIT 10;`,
        //This is the parameters
        {
        $session_id_ : session_id,
        $streamer_id_ : streamer_id
        },
        //This is the callback
         (err, rows)=>{
            if(err){
                reject(err);
            } else{
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
add_row,
update_row,
promise_read_top_ten,
promise_read_top_ten_all
}
