const database = require('./sqlite3_helper.js');
const currentDate = new Date();
const s = "1996-08-02T18:35:20.000Z"
const s_t = "20240120T18352000Z"


const currentDayOfMonth = currentDate.getDate();
const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
const currentYear = currentDate.getFullYear();


const date = new Date("2024-01-20T18:35:20.00Z");
const date_two = new Date("2024 01 20 T18 35 20 00Z");
const simple_date = new Date(2024, 1, 20, 18, 35, 20)
const sliced = new Date(s.slice(0,4), s.slice(6,7) - 1, s.slice(9,10), s.slice(12,13), s.slice(15,16), s.slice(18,19))
const convert = new Date(s_t.slice(0,4), s_t.slice(5,6) - 1, s_t.slice(7,8), s_t.slice(10,11), s_t.slice(12,13), s_t.slice(14,15))
const sliced2 = new Date(s.charAt(0))

console.log(date);
console.log(simple_date);
console.log(s);
console.log(convert);

