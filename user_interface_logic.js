const game_tracker_array = [[],[],[],[]];// Id doesn't need empty games.. It just needs to look that way.
let global_win_rate = 0;
let points_bet = 1000;

//I need to figure out how the JS is going to get win rate and points bet. 

game_tracker_array[3] = ["Jonathan", 1, 2];

game("Jonathan", 1, 2, "10")

function game(player_id_string, win_loss_bool, crowns_take_int, game_time){
    console.log("Game Function");
    let game_result = [
        player_id_string,
        win_loss_bool,
        crowns_take_int,
        game_time];
    game_array_pusher(game_result);
}

function game_array_pusher(game_result){
   console.log("game array pusher function"); 
    game_tracker_array[0] = game_tracker_array[1];
    game_tracker_array[1] = game_tracker_array[2];
    game_tracker_array[2] = game_result;
    bet_analyzer(); 
}

function bet_analyzer(){
    console.log("be_analaizer");
    let prediction = game_tracker_array[3];
    let game_result = game_tracker_array[2];
    for(let i = 0; i < prediction.length; i++){
        if(prediction[i] == game_result[i] ){
            continue;
        } else{
            console.log("You lost");
            return 0;
        }    
    }
   winning_points_calculator(global_win_rate, points_bet) 
}

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