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

function createTable(db) {
    db.run(`CREATE TABLE leaderboard (
        ID INTEGER,
        user_name VARCHAR(50),
        total_points INTEGER,
        play_date VARCHAR(12),
        streamer_id VARCHAR(12),
        session_id VARCHAR(20)
        );
        `);
}

function add_row(db, user_name, points, date, streamer_id, session_id) {
    db.run(`
    INSERT INTO leaderboard VALUES(1, $user_name_, $points_, $date_ , $streamer_id_, $session_id_);    
    `, {
        user_name_ : user_name,
        points_ : points,
        date_ : date,
        streamer_id_ : streamer_id,
        session_id_ : session_id
    })
}

function read_record(db) {
    text = db.all('SELECT * FROM leaderboard;', function(err, table) {
        console.log(table);
        let ID = table[0].ID;
        //console.log(ID)

})
}



module.exports = {
createDbConnection,
read_record,
add_row
}
