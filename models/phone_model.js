const sequelize = require("sequelize");
const my_db = require("../utils/db");

const Phone = my_db.define('phone', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: {
        type: sequelize.STRING,
        allowNull: false,
    },
    brand: {
        type: sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize.DOUBLE,
        allowNull: false,
    },
    img_url: {
        type: sequelize.STRING,
        allowNull: false,
    },
    specification: {
        type: sequelize.STRING,
        allowNull: false,
    }

});

module.exports = Phone;