const user = require("../models/phone_model");
const my_db = require("./db");

const assoc = async () => {
    try {
        await my_db.sync({ force: false });
    } catch (error) {
        console.log(`Error Create : ${error}`);
    }
}

module.exports = assoc;