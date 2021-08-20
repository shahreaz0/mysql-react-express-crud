const Employee = require("../models/employee");
const faker = require("faker");

const addFakeData = async () => {
	for (let i = 0; i < 50; i++) {
		await Employee.create({
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			email: faker.internet.email(),
		});
	}
};

module.exports = addFakeData;
