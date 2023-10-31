let game_tracker_array = [];// Id doesn't need empty games.. It just needs to look that way.
let game_results_array = [
    {
    "win_lose" : 1,
    "crowns_taken" : 3,
    "crowns_lost" : 1,
    "opponent_name" : "drybonez"
}];

//game results data.... 
//Oponent Name: name
//Win_Lose : 0 or 1
//Crowns Taken 0-3
//Crowns Lost 0 -3


//game("Jonathan", 1, 2, "10")

function array_builder(){
    let number = parseInt(document.getElementById("points_bet_1").value);
    let potential_points = parseFloat(document.getElementById("calculated_bet_number").innerHTML);
    let crowns_taken_checked = document.getElementById("crowns_taken_toggle_1").checked ? 1:0;
    let crowns_lost_checked = document.getElementById("crowns_lost_toggle_1").checked ? 1:0;
    let win_lose_toggle = document.getElementById("win_loss_toggle_input_value").checked ? 1:0;
    let blue_crowns_int = parseInt(document.getElementById("blue_crowns_checked").value);
    let red_crowns_int = parseInt(document.getElementById("red_crowns_checked").value);
    let box_1 = document.getElementById("place_bet"); 
    
    const values = {
        "win_or_lose": win_lose_toggle,
        "red_crowns_int": red_crowns_int,
        "blue_crowns_int": blue_crowns_int,
        "bet_on_crowns_taken": crowns_taken_checked,
        "bet_on_crowns_lost": crowns_lost_checked,
        "points_bet": number,
        "potential_points": potential_points,
    }
    game_tracker_array.unshift(values);
} 

function game(player_id_string, win_loss_bool, crowns_take_int, game_time){
    console.log("Game Function");
    let game_result = [
        player_id_string,
        win_loss_bool,
        crowns_take_int,
        game_time];
    game_array_pusher(game_result);
}

// function game_array_pusher(game_result){
//    console.log("game array pusher function"); 
//     game_tracker_array[0] = game_tracker_array[1];
//     game_tracker_array[1] = game_tracker_array[2];
//     game_tracker_array[2] = game_result;
//     bet_analyzer(); 
// }
//
// function bet_analyzer(){
//     win_lose_toggle = game_results_array[0].win_or_lose;
//     crowns_taken_checked = game_results_array[0].bet_on_crowns_taken;
//     crowns_lost_checked = game_results_array[0].bet_on_crwons_lost;

//     if(win_lose_toggle != game_results_array[0].win_lose){
//         return false;
//     }

//     if(crowns_taken_checked){
//         if(game_results_array[0].crowns_taken != game_tracker_array[0].red_crowns_int){
//             return false;
//         }
//     }
    
//     if(crowns_lost_checked){
//         if(game_results_array[0].crowns_lost != game_tracker_array[0].blue_crowns_int){
//             return false;
//         }
//     }
//     return true;
// }
//Probably going to delete this code.
function winning_points_calculator(win_rate, points_bet){
    let win_rate_multiplier = 0.0;
    let win_lose = game_tracker_array[2][1] ? 1:0;
    if(win_lose == 1){//They say ox will wins
        //If oxes win rate is at 0% they should get more points
        win_rate_multiplier = 2 - win_rate ;
    } else {//This is if od win rate is 100 and they predict he loses. 
        win_rate_multiplier = 1 + win_rate;
    }
    let parlay_multiplier = game_tracker_array[3].length;
    console.log(win_rate_multiplier + " " + parlay_multiplier )
    console.log((win_rate_multiplier * points_bet) * parlay_multiplier);
    return win_rate_multiplier * points_bet * parlay_multiplier;
}

function calculator_gun(){
    let number = parseInt(document.getElementById("points_bet_1").value);
    let win_rate = parseFloat(document.getElementById("streamer_win_rate_number").innerHTML) / 100;
    let potential_points = document.getElementById("calculated_bet_number");
    let crowns_taken_checked = document.getElementById("crowns_taken_toggle_1").checked ? 1:0;
    let crowns_lost_checked = document.getElementById("crowns_lost_toggle_1").checked ? 1:0;
    let win_lose_toggle = document.getElementById("win_loss_toggle_input_value").checked ? 1:0;
    let win_rate_multiplier = 0.0;

    if(win_lose_toggle == 1){//They say ox will wins
        //If oxes win rate is at 0% they should get more points
        win_rate_multiplier = 2 - win_rate ;
    } else {//This is if od win rate is 100 and they predict he loses. 
        win_rate_multiplier = 1 + win_rate;
    }
    potential_points.innerHTML = number * win_rate_multiplier * (crowns_taken_checked + crowns_lost_checked + 1);
    return;
}

//export{game_tracker_array, game_results_array, calculator_gun};