const express = require("express");
const cors = require("cors");
if (!(process.env.NODE_ENV === "production")) require("dotenv").config();
const nodemailer = require("nodemailer");

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

app.post("/api/employees/sendmail", async (req, res) => {
	const { body, email } = req.body;
	const transport = nodemailer.createTransport({
		host: process.env.MT_HOST,
		port: process.env.MT_PORT,
		auth: {
			user: process.env.MT_USERNAME,
			pass: process.env.MT_PASSWORD,
		},
	});

	await transport.sendMail({
		from: process.env.MAIL_FROM,
		to: "neeloy@live.com",
		subject: "test email",
		html: `<div className="email" 
						style="border: 1px solid black;
				   		padding: 20px;
				   		font-family: sans-serif;
				   		line-height: 2;
				    	font-size: 20px; 
				   ">
				    	<h2>Here is your email!</h2>
				        <p>${body}</p>
				    
				        <p>All the best, Darwin</p>
				    </div>
   		        `,
	});
});

// server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`http://localhost:3001`));
