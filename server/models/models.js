const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
    room: { type: DataTypes.STRING },
});
module.exports = { User };
