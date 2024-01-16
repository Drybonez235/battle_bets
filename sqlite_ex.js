const database = require('./sqlite3_helper.js');

async function read_top_ten_express() {
    const data = database.read_top_ten("Sessions_number2", "Streamer_ID");
    console.log(data[0]);
}

 async function get_data(){
    const data = await database.promise_read_top_ten_all("Sessions_number2", "Streamer_ID");
    console.log(data);
}

async function read_record_here(user_name, streamer_id, session_id){
    const data = await database.read_record(user_name, streamer_id, session_id);
    console.log(data[0]);
}

async function update_row_here(user_name, streamer_id, session_id, points){
    const promise = await database.update_row(user_name, streamer_id, session_id, points);
    const confirm = await database.read_record(user_name, streamer_id, session_id);
    console.log(confirm);
}
//database.add_row("Test_1", 50, 'ox_test', "1");

//read_record_here('Test_1', 'ox_test', "1");
update_row_here("Test_1", 'ox_test', '1', 1000);
//read_record_here('Test_1', 'ox_test', "1");
//read_record_here('Test_1', 'ox_test', "1"));
console.log("This should ahppens before.");
