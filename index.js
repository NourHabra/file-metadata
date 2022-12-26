var express = require("express");
var cors = require("cors");
require("dotenv").config();
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

const PORT = process.env.PORT || 5000;

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));
app.use(express.json());

app.get("/", (req, res) => {
	res.sendFile(process.cwd() + "/views/index.html");
});

const uploadFile = async (req, res) => {
	res.send({
		name: req.file.originalname,
		type: req.file.mimetype,
		size: req.file.size,
	});
};

app.post("/api/fileanalyse", upload.single("upfile"), uploadFile);

app.listen(PORT, () => {
	console.log("Your app is listening on port " + PORT);
});
