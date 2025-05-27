const sequelize = require("sequelize");
const my_db = require("../utils/db");

const User = my_db.define('users', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    email: {
        type: sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize.STRING,
        allowNull: false,
    },
    phone_number: {
        type: sequelize.STRING,
        allowNull: false,
    },

});

module.exports = User;