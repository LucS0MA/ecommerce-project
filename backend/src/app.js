require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");

const router = require("./router");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/static", express.static("images"));

// -- MULTER --
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  res.status(201).json({ file: req.file });
});
// ------------

app.get("/", (req, res) => {
  res.status(200).json({ message: "L'API est connectée !" });
});

app.use("/api", router);

app.get("*", (req, res) => {
  res.status(404).json({ message: "Not Found !" });
});

module.exports = app;
