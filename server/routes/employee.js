const router = require("express").Router();
const fs = require("fs-extra");
const path = require("path");
const csv = require("fast-csv");
const validator = require("validator");
const nodemailer = require("nodemailer");
//models
const Employee = require("../models/employee");
//config middleware
const fileUpload = require("../configs/multer");

//routes
router.get("/", async (req, res) => {
	try {
		const employees = await Employee.findAll();
		res.send(employees);
	} catch (error) {
		res.status(500).send({ message: "Server error" });
	}
});

router.post("/", async (req, res) => {
	try {
		const { firstName, lastName, email } = req.body;

		const employee = await Employee.create({
			firstName,
			lastName,
			email,
		});
		res.send(employee);
	} catch (error) {
		res.status(500).send({ message: "Server error" });
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
				throw error.message;
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
			})
			.on("end", () => {
				// save employee to MySQL database
				Employee.bulkCreate(employees).then(() => {
					const result = {
						status: "ok",
						filename: req.file.originalname,
						message: "Upload Successfully!",
					};

					res.send(result);
				});
				fs.emptyDirSync(path.join("uploads"));
			});
	} catch (error) {
		fs.emptyDirSync(path.join("uploads"));
		const result = {
			status: "fail",
			filename: req.file.originalname,
			message: "Upload Error! message = " + error.message,
		};
		res.status(500).send(result);
	}
});

router.post("/api/employees/sendmail", async (req, res) => {
	const { subject, body, emails } = req.body;

	if (!subject && !body) return res.send("No subject and body");

	const emailsString = emails.join(",");
	const transport = nodemailer.createTransport({
		host: process.env.MT_HOST,
		port: process.env.MT_PORT,
		auth: {
			user: process.env.MT_USERNAME,
			pass: process.env.MT_PASSWORD,
		},
	});

	try {
		await transport.sendMail({
			from: process.env.MAIL_FROM,
			to: emailsString,
			subject: "test email",
			html: `<div>
			<h1>${subject}</h1>
			<p>${body}</p>
		</div>`,
		});
		res.send("successfully send email");
	} catch (error) {
		res.status(500).send({ message: "Server error" });
	}
});

module.exports = router;
