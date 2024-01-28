const express = require('express');
const router = require("./src/routes/index");
const cors = require('cors');
const mongoose = require("mongoose");
require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json("Server working fine");
});

app.use(router);

mongoose.connect(process.env.DB_URL);

const PORT = process.env.PORT || 8000 ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
