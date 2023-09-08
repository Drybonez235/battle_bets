const get_values = () =>{
    const win_lose_toggle = document.getElementById("win_loss_toggle_input_value").checked ? 1 : 0;
    const crowns_taken_toggle = document.getElementById("crowns_taken_toggle_1").checked ? 1 : 0;
    const crowns_taken_value = document.getElementById("crown_taken_img_count_1");
    const crowns_lost_toggle = document.getElementById("crowns_lost_toggle_1").checked ? 1 : 0;
    const crowns_lost_value = 0;
    const bet_amount = document.getElementById("points_bet_1").value;

    console.log(win_lose_toggle);
    console.log(crowns_taken_toggle);
   console.log(crowns_taken_value);
    console.log(crowns_lost_toggle);
    console.log(bet_amount);
}

const add_crown = (tag_id, win_lose) => {
    const blue_crown = "images/blue_crown.png";
    const red_crown = "images/crown_red.png"
    let blue_crown_count = document.getElementById("blue_crowns_checked");
    let red_crown_count = document.getElementById("red_crowns_checked");
    let blue_crowns_count_value = parseInt(blue_crown_count.value);
    let red_crowns_count_value = parseInt(red_crown_count.value);

    let current_crown = document.getElementById(tag_id);
    if(win_lose == "win"){
        red_crown_count.value = red_crowns_count_value + 1;
        current_crown.outerHTML = "<img id='" + tag_id + "' class='cursor-pointer inline object-contain h-8' onclick=\"remove_crown('"+ tag_id + "', 'win')\" src='" + red_crown + "'>";
    } else{
        blue_crown_count.value = blue_crowns_count_value + 1;
        current_crown.outerHTML = "<img id='" + tag_id + "' class='cursor-pointer inline object-contain h-8' onclick=\"remove_crown('"+ tag_id + "', 'lose')\" src='" + blue_crown + "'>";
    }
}

const remove_crown = (tag_id, win_lose) => {
    const blue_crown = "images/crown_blue_outline.png";
    const red_crown = "images/crown_red_outline.png";
    let blue_crown_count = document.getElementById("blue_crowns_checked");
    let red_crown_count = document.getElementById("red_crowns_checked");
    let blue_crowns_count_value = parseInt(blue_crown_count.value);
    let red_crowns_count_value = parseInt(red_crown_count.value);

    let current_crown = document.getElementById(tag_id);
    if(win_lose == "win"){
        red_crown_count.value = red_crowns_count_value - 1;
        current_crown.outerHTML = "<img id='" + tag_id+ "' class='cursor-pointer inline object-contain h-8' onclick=\"add_crown('" + tag_id + "', 'win')\" src='" + red_crown + "'>";
    } else{
        blue_crown_count.value = blue_crowns_count_value - 1;
        current_crown.outerHTML = "<img id='" + tag_id+ "' class='cursor-pointer inline object-contain h-8' onclick=\"add_crown('" + tag_id + "', 'lose')\" src='" + blue_crown + "'>";
    }
}

const reset_bet = () => {
    let win_lose_toggle = document.getElementById("win_loss_toggle_input_value");
    let crowns_taken_toggle = document.getElementById("crowns_taken_toggle_1");
    let crowns_lost_toggle = document.getElementById("crowns_lost_toggle_1");
    let bet_amount = document.getElementById("points_bet_1");
    let projected_winnings = document.getElementById("calculated_bet_number");



     win_lose_toggle.checked = false;
     crowns_taken_toggle.checked = false;
    crowns_lost_toggle.checked = false; 
     bet_amount.value = 0;
     projected_winnings.innerHTML = 0;
}

const results_builder = () =>{
    game_tracker_array
    const thumbs_up = '<img class="object-contain h-10 inline" src="images/emote_king_thumbs_up.png">'
    const thumbs_down = '<img class="object-contain h-10 inline" src="images/emote_king_cry.png">'
    const crowns_taken_images = crowns_taken_img_builder();
    const crowns_lost_images = crowns_lost_img_builder(); 
    const win_lose = ''
    const game_id = ''

    const div_structure = `<div class="inline-block bg-white rounded-3xl ml-2 p-1" id="result_div_structure_${game_id}">
    <div class="" id="result_div_container_${game_id}">
        <div class="border-b-2 " id="result_top_${game_id}">
            <p class="text-center" id="">Battle Number: <span id="battle_number_value_${game_id}">__</span></p>
            <p class="inline-block" id="prediction_results_game_${game_id}">You WIN</p>
            <img class="object-contain h-10 inline" src="images/emote_king_thumbs_up.png">
        </div>
        <div class="mt-1" id="result_middle_${game_id}">
            <div class="" id="result_battle_win_loss_div_${game_id}">
                <p class="" id="result_battle_win_loss_text_${game_id}">Battle Result: WIN</p>
                <img class="object-contain h-8" id="result_battle_win_loss_img_${game_id}" src="">
            </div>
            <!-- So here we are going to outline it with red or green depending on if they got it right or not.-->
            <div class="mt-2" id="result_crowns_taken_div_${game_id}">
                <p class="result_crowns_taken_text_${game_id}">Crowns Taken</p>
                <div class="inline-block" id="crowns_taken_img_div_${game_id}">
                    ${crowns_taken_images}
                </div>
            </div>
            <div class="" id="result_crowns_lost_div_${game_id}">
                <p id="result_crowns_taken_text_${game_id}">Crowns Lost</p>
                <div class="group" id="crowns_lost_img_div_${game_id}">
                    ${crowns_lost_images} 
                </div>
            </div>
        </div>
        <div class="border-t-2 mt-2 mb-2" id="result_end_${game_id}">
            <div class="" id="">
                 <p class="" id="result_points_bet_text_${game_id}">Points Bet:
                 <span class="inline" id="result_points_bet_value_${game_id}">30</span></p>
            </div>
            <div>
                <p class="rounded-3xl bg-emerald-50" id="result_points_won_text_${game_id}">+
                <span class="" id="result_points_won_value_${game_id}">400</span></p>
            </div>
        </div>
    </div>
</div>`  
}

const crowns_taken_img_builder = (crowns_taken, crowns_taken_predicted) => {
    let crowns_taken_number = crowns_taken;
    let crowns_taken_predicted_number = crowns_taken_predicted;
    const blue_crown_green = '<img class="object-contain inline bg-green-600 rounded-full h-8" src="images/blue_crown.png">'
    const red_crown_green = '<img class="object-contain inline bg-green-600 rounded-full h-8" src="images/crown_red.png">'
    const blue_crown_red = '<img class="object-contain inline bg-red-600 rounded-full h-8" src="images/blue_crown.png">'
    const red_crown_red = '<img class="object-contain inline bg-red-600 rounded-full h-8" src="images/crown_red.png">'
    const red_crown_red_outline = '<img class="object-contain inline bg-red-600 rounded-full h-8" src="images/crown_red_outline.png">'
    const red_crown_green_outline = '<img class="object-contain inline bg-green-600 rounded-full h-8" src="images/crown_red_outline.png">'
    let crowns_taken_img = ''

    for(let i = 3; i > 0; i--){
        if(crowns_taken_number > 0 && crowns_taken_predicted_number > 0){
            crowns_taken_img = crowns_taken_img.concat(red_crown_green);
            crowns_taken_number = crowns_taken_number - 1;
            crowns_taken_predicted_number = crowns_taken_predicted_number - 1; 
        } else if(crowns_taken_number == 0 && crowns_taken_predicted_number > 0){
            crowns_taken_img = crowns_taken_img.concat(red_crown_red_outline); 
            crowns_taken_predicted_number = crowns_taken_predicted_number - 1; 
        } else if (crowns_taken_number > 0 && crowns_taken_predicted_number == 0){
            crowns_taken_img = crowns_taken_img.concat(red_crown_red);
            crowns_taken_number = crowns_taken_number - 1;
        } else if(crowns_taken_number == 0 && crowns_taken_predicted_number == 0){
            crowns_taken_img = crowns_taken_img.concat(red_crown_green_outline);
        }
    }
    return crowns_taken_img;
}

const crowns_lost_img_builder = (crowns_lost, crowns_lost_predicted) => {
    let crowns_lost_number = crowns_lost;
    let crowns_lost_predicted_number = crowns_lost_predicted;
    const blue_crown_green = '<img class="object-contain inline bg-green-600 rounded-full h-8" src="images/blue_crown.png">'
    const blue_crown_red = '<img class="object-contain inline bg-red-600 rounded-full h-8" src="images/blue_crown.png">'
    const blue_crown_red_outline = '<img class="object-contain inline bg-red-600 rounded-full h-8" src="images/crown_blue_outline.png">'
    const blue_crown_green_outline = '<img class="object-contain inline bg-green-600 rounded-full h-8" src="images/crown_blue_outline.png">'
    let crowns_lost_img = ''

    for(let i = 3; i > 0; i--){
        if(crowns_lost_number > 0 && crowns_lost_predicted_number > 0){
            crowns_lost_img = crowns_lost_img.concat(blue_crown_green);
            crowns_lost_number = crowns_lost_number - 1;
            crowns_lost_predicted_number = crowns_lost_predicted_number - 1;

        } else if(crowns_lost_number == 0 && crowns_lost_predicted_number > 0){
            crowns_lost_img = crowns_lost_img.concat(blue_crown_red_outline); 
            crowns_lost_predicted_number = crowns_lost_predicted_number - 1; 

        } else if (crowns_lost_number > 0 && crowns_lost_predicted_number == 0){
            crowns_lost_img = crowns_lost_img.concat(blue_crown_red);
            crowns_lost_number = crowns_taken_number - 1;

        } else if(crowns_lost_number == 0 && crowns_lost_predicted_number == 0){
            crowns_lost_img = crowns_lost_img.concat(blue_crown_green_outline);
        }
    }
    return crowns_lost_img;
}