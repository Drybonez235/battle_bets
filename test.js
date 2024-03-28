const database = require('./sqlite3_helper.js');
const manage = require("./manage_clash_data.js");

const now = "20240327T092020.000Z";
const simple_date = new Date(Date.UTC(2024, 12-1, 20, 18, 35, 20))
const s_t = "20240326T205733.000Z"
const convert = new Date(Date.UTC(s_t.slice(0,4), s_t.slice(4,6)-1, s_t.slice(6,8), s_t.slice(9,11), s_t.slice(11,13), s_t.slice(13,15)));
const convert_now_now = new Date(now.slice(0,4), now.slice(4,6)-1, now.slice(6,8), now.slice(9,11), now.slice(11,13), now.slice(13,15));
const convert_now = new Date(Date.UTC(now.slice(0,4), now.slice(4,6)-1, now.slice(6,8), now.slice(9,11), now.slice(11,13), now.slice(13,15)));

//async function try_this() {
    //let data = await database.get_new_battle_data(convert.valueOf(), "2VL9VP8Y0").then(function (value) {console.log(value)});

    // await manage.get_clash_data("2VL9VP8Y0").then(async function (value) {
    //     await manage.add_new_battle_data(value, "2VL9VP8Y0", convert.valueOf())
    // });


//}
database.read_table("battle_data");
//try_this();
//console.log(database.get_new_battle_data(convert.valueOf(), "2VL9VP8Y0"));