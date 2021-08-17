const express = require("express");
const cors = require("cors");
const sequelize = require("./configs/db");
const app = express();
const fileUpload = require("./configs/multer");

const Employee = require("./models/employee");
//db
sequelize
	.sync()
	.then((result) => console.log("connected"))
	.catch((error) => console.log(error));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.get("/", (req, res) => {
	res.send("home");
});

app.get("/api/employees", async (req, res) => {
	try {
		const all = await Employee.findAll();
		res.send(all);
	} catch (e) {
		console.log(e);
	}
});

app.post("/api/employees", async (req, res) => {
	try {
		const { firstName, lastName, email } = req.body;
		const sumon = await Employee.create({
			firstName,
			lastName,
			email,
		});

		res.send({ sumon });
		console.log(sumon);
		res.redirect("");
	} catch (e) {
		// statements
		console.log(e);
	}
});

app.post("/api/upload", fileUpload, async (req, res) => {
	console.log("files from axios", req.file);
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`http://localhost:3001`));
