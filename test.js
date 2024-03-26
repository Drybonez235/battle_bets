const database = require('./sqlite3_helper.js');
//const currentDate = new Date();
//const date_two = new Date("2024 01 20 T18 35 20 00Z");

// const currentDayOfMonth = currentDate.getDate();
// const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
// const currentYear = currentDate.getFullYear();

const s = "2024-12-20T18:35:20.000Z"
const date = new Date("2024-12-20T18:35:20.000Z");
const simple_date = new Date(Date.UTC(2024, 12-1, 20, 18, 35, 20))
//const sliced = new Date(s.slice(0,4), s.slice(6,7), s.slice(9,10), s.slice(12,13), s.slice(15,16), s.slice(18,19))
const s_t = "20241220T183520.000Z"
const convert = new Date(Date.UTC(s_t.slice(0,4), s_t.slice(4,6)-1, s_t.slice(6,8), s_t.slice(9,11), s_t.slice(11,13), s_t.slice(13,15)))
//const sliced2 = new Date(s.charAt(0))

// console.log(s);
// console.log(date.valueOf());
// console.log(simple_date);
// console.log(s_t);
// console.log(convert.toISOString())
// console.log(convert.valueOf());
// database.add_row_battle_data(convert.valueOf(), "2VL9VP8Y0", "Josua", 3, 0);

async function try_this() {
    let data = await database.get_new_battle_data(convert.valueOf(), "2VL9VP8Y0").then(function (value) {console.log(value)});
}

try_this();
//console.log(database.get_new_battle_data(convert.valueOf(), "2VL9VP8Y0"));