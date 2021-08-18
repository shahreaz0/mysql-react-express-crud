const express = require("express");
const cors = require("cors");

//db
const sequelize = require("./configs/db");
sequelize
	.sync()
	.then((res) => console.log("Database connected!"))
	.catch((err) => console.log(err));

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
