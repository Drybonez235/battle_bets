async function fetch_clash_data(){ //user_name_, streamer_id_, last_refresh_time_){
    console.log("Are we hitting this?")
    let data = {
        user_name: "Jonathan",//user_name_,
        streamer_id: "2VL9VP8YO",//streamer_id_,
        last_refresh_time: "0",//last_refresh_time_
        session_id: "0"
    };
    data = JSON.stringify(data);
    console.log(data);
    try {
        await fetch("http://localhost:8080", {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json" 
            }, 
            body: data
        }).then(function (data) {
            console.log(data);
            receive_clash_data(data);
        })
    } catch (error) {
        console.log(error)
    }
}

async function send_points_data(user_name, last_refresh_time, points){

}

function receive_clash_data(data){
    let clash_data = [];
    let length = data.length();
    for(i=0; i<length; i++){
        let record = {};
        let current_record = data.new_clash_data[i];
        record["battle_time"] = current_record.battle_time;
        record["crowns_won"] = current_record.crowns_won;
        record["crowns_lost"] = current_record.crowns_lost;
        record["opponent_name"] = current_record.opponent_name;
        clash_data.push(record);
    }
    console.log(clash_data);
}