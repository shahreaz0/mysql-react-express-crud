const router = require("express").Router();
const fs = require("fs-extra");
const path = require("path");
const csv = require("fast-csv");
const validator = require("validator");
//models
const Employee = require("../models/employee");
//config middleware
const fileUpload = require("../configs/multer");

//routes
router.get("/api/employees", async (req, res) => {
	try {
		const all = await Employee.findAll();
		res.send(all);
	} catch (e) {
		res.send(e);
	}
});

router.post("/api/employees", async (req, res) => {
	try {
		const { firstName, lastName, email } = req.body;

		const employee = await Employee.create({
			firstName,
			lastName,
			email,
		});
		res.send(employee);
	} catch (e) {
		console.log(e);
	}
});

router.post("/api/upload", fileUpload, async (req, res) => {
	try {
		const employees = [];

		const parseData = csv.parse({
			ignoreEmpty: true,
			discardUnmappedColumns: true,
			headers: ["firstName", "lastName", "email"],
		});

		fs.createReadStream(path.join("uploads", req.file.filename))
			.pipe(parseData)
			.on("error", (error) => {
				console.error(error);
				// throw error.message;
			})
			.on("data", (row) => {
				const newRow = {
					firstName: row.firstName.trim(),
					lastName: row.lastName.trim(),
					email: row.email.trim(),
				};
				if (
					newRow.firstName !== "" &&
					newRow.lastName !== "" &&
					newRow.email !== "" &&
					validator.isEmail(newRow.email)
				)
					employees.push(newRow);
				// console.log(row);
			})
			.on("end", () => {
				//Save employee to MySQL database
				// Employee.bulkCreate(employees).then(() => {
				// 	const result = {
				// 		status: "ok",
				// 		filename: req.file.originalname,
				// 		message: "Upload Successfully!",
				// 	};

				// 	res.json(result);
				// });

				// const filtered = employees.filter(
				// 	(emp) =>
				// 		emp.firstName !== "" &&
				// 		emp.lastName !== "" &&
				// 		emp.email !== ""
				// );

				res.json(employees);
				fs.emptyDirSync(path.join("uploads"));
			});
	} catch (error) {
		fs.emptyDirSync(path.join("uploads"));
		const result = {
			status: "fail",
			filename: req.file.originalname,
			message: "Upload Error! message = " + error.message,
		};
		res.json(result);
	}
});

module.exports = router;
