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

