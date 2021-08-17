const multer = require("multer");
const path = require("path");

// multer config
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join("uploads"));
	},
	filename: function (req, file, cb) {
		const formattedName = file.originalname.split(" ").join("_");
		cb(null, `${Date.now()}_${formattedName}`);
	},
});
const upload = multer({
	storage,
	limits: {
		fileSize: 9000000,
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.csv$/i)) {
			cb(new Error("File type not allowed."));
		}
		cb(null, true);
	},
});

const fileUpload = upload.single("csvFile");

module.exports = fileUpload;
