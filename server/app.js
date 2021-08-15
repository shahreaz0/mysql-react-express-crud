const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.send("home");
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`http://localhost:3001`));
