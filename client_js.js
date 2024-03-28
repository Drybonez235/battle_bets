async function fetch_clash_data(){ //user_name_, streamer_id_, last_refresh_time_){
    let data = {
        user_name: "Jonathan",//user_name_,
        streamer_id: "2VL9VP8Y0",//streamer_id_,
        last_refresh_time: "0",//last_refresh_time_
        session_id: "0"
    };
    data = JSON.stringify(data);
    try {
        let call = await fetch("http://localhost:8080", {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json" 
            }, 
            body: data
        })
        let call_response = await call.json();
            receive_clash_data(call_response);
    
    } catch (error) {
        console.log(error)
    }
}

async function send_points_data(user_name, last_refresh_time, points){

}

function receive_clash_data(data){
    let clash_data = [];
    let top_ten = [];
    let clash_length = data.clash_royal_data.length;
    let top_ten_length = data.top_ten.length;
    for(i=0; i< clash_length; i++){
        let record = {};
        let current_record = data["clash_royal_data"][i];
        record["battle_time"] = current_record.battle_time;
        record["crowns_taken"] = current_record.crowns_taken;
        record["crowns_lost"] = current_record.crowns_lost;
        record["opponent_name"] = current_record.opponent_name;
        clash_data.push(record);
    }
    for(i=0; i< top_ten_length; i++){
        let record = {};
        let current_record = data["top_ten"][i];
        record["user_name"] = current_record.user_name;
        record["total_points"] = current_record.total_points;
        top_ten.push(record);
    }
    console.log(clash_data);
    console.log(top_ten);
}