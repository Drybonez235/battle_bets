const game_tracker_array = [{},{},{},{}];// Id doesn't need empty games.. It just needs to look that way.



function game (player_id_string, win_loss_bool, crowns_take_int, game_time){
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

    
}

function place_bet(){


}//this will take the imputs from the interface and build a struct based on what they want to bet on.

function winning_points_calculator(win_rate, parlay, points_bet){


    let win_rate_multiplier = 0;
    let parlay_multiplier = game_tracker_array[4].lenght();
    let points_bet = points_bet;

    return win_rate_multiplier * points_bet * parlay_multiplier;
}

function win_rate_multiplier_calculation(){
    
}