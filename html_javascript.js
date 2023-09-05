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

const add_crown = (tag, win_lose) => {
    
}


const reset_bet = () => {
    let win_lose_toggle = document.getElementById("win_loss_toggle_input_value");
    let crowns_taken_toggle = document.getElementById("crowns_taken_toggle_1");
    let crowns_taken_value = 0;
    let crowns_lost_toggle = document.getElementById("crowns_lost_toggle_1");
    let crowns_lost_value = 0;
    let bet_amount = document.getElementById("points_bet_1");

     win_lose_toggle.checked = true;
     crowns_taken_toggle.checked = false;
    crowns_lost_toggle.checked = false; 
     bet_amount.value = 0;
}

