const express = require("express");
const cors = require("cors");
if (!(process.env.NODE_ENV === "production")) require("dotenv").config();

//db
const sequelize = require("./configs/db");
sequelize
	.sync()
	.then((res) => console.log("Database connected!"))
	.catch((err) => console.log(err));

//add fake data to the database
addFakeData = require("./configs/faker");
addFakeData();

// express configs
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.get("/", (req, res) => {
	res.send("home");
});

app.use(require("./routes/employee"));

// server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`http://localhost:3001`));
