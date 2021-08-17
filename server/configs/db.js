const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("hrman", "root", "admin", {
	dialect: "mysql",
	host: "localhost",
});

module.exports = sequelize;
