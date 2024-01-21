const express = require('express');
require("dotenv").config();
const app = express();
const port = 5000;
const routes = require("./routes");
const {upload} = require('./Middlewares/AddBookFileMiddleware');

const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());



app.use(routes);
app.use(express.static("Uploads\\posters"))
app.use(express.static("Uploads\\files"))


mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch((e) => console.log(e));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
