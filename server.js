const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mainRoute = require("./routes/index.js");

mongoose.connect("/");

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use("/api", mainRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor`);
});

