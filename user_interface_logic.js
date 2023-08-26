const game_tracker_array = [{},{},{},{}];// Id doesn't need empty games.. It just needs to look that way.
let global_win_rate = 100;
let points_bet = 1000;

game_tracker_array[3] = ["Jonathan", 1, 2];

game("Jonathan", 1, 2, "10")

function game(player_id_string, win_loss_bool, crowns_take_int, game_time){
    let game_result = {
        player_id : player_id_string,
        win_loss : win_loss_bool,
        crowns_taken : crowns_take_int,
        time_stamp : game_time
    };
    return game_array_pusher(game_result);
}

function game_array_pusher(game_result){
    game_tracker_arry[0] = game_tracker_arry[0];
    game_tracker_arry[1] = game_tracker_arry[2];
    game_tracker_arry[2] = game_result;
    bet_analyzer(); 
}

function bet_analyzer(){
    let prediction = game_tracker_array[3];
    let game_result = game_tracker_array[2];
    for(let i = 0; i < game_result.length(); i++){
        if(prediction[i] == game_result[i] ){
            continue;
        } else{
            return false;
        }    
    }
   winning_points_calculator(global_win_rate, points_bet) 
}

function place_bet(){


}//this will take the imputs from the interface and build a struct based on what they want to bet on.

function winning_points_calculator(win_rate, points_bet){
    let win_rate_multiplier = 0.0;
    let win_lose = game_tracker_array[2].win_loss ? 1:0;
    if(win_lose == 1){//They say ox will wins
        //If oxes win rate is at 0% they should get more points
        win_rate_multiplier = 2 - win_rate ;
    } else {//This is if od win rate is 100 and they predict he loses. 
        win_rate_multiplier = 1 + win_rate;
    }

    let parlay_multiplier = game_tracker_array[4].lenght();
    let points_bet = points_bet;

    console.log((win_rate_multiplier * points_bet) * parlay_multiplier);
}

function winning_points_adder(points){

}