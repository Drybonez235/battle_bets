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
  console.log("Connection with SQLite has been established");
  return db;
}
}

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

function update_row(user_name, session_id, streamer_id, points){
    const db = createDbConnection();
    db.run(`
   UPDATE leaderboard SET total_points = $points_ WHERE user_name = $user_name_ AND streamer_id = $streamer_id_ AND session_id = $session_id_;
    `, {
        $user_name_ : user_name,
        $session_id_ : session_id,
        $streamer_id_ : streamer_id,
        $points_ : points
    })
    db.close();
}

function read_record() {
    const db = createDbConnection();
    text = db.all('SELECT * FROM leaderboard;', function(err, table) {
        console.log(table);
        //let ID = table[0].ID;
        //console.log(ID)

})
db.close();
}

function read_top_ten(session_id, streamer_id){
    const db = createDbConnection();
    return_value = [];
     value = db.all(`SELECT user_name, total_points FROM leaderboard WHERE session_id = $session_id_ AND streamer_id = $streamer_id_ ORDER BY total_points DESC LIMIT 10;
    `,{
        $session_id_ : session_id,
        $streamer_id_ : streamer_id
    }, function(err, table){
        for(i=0;i < 10; i++){
            return_value.push(table[i]);
            //console.log(table[i]);
        }
        //console.log(return_value);
    })
    db.close();
    return value;
}


module.exports = {
createDbConnection,
read_record,
add_row,
update_row,
read_top_ten
}
