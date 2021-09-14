const express = require('express');
const cors = require("cors")
const mongoose = require('mongoose');
const app = express();

const router = require('./routes');

const { debug } = require('./debug');

app.use(cors());
app.use(express.json());

const port = 9001;


// mongoose.connect(config.mongoURL, { useNewUrlParser: true }, { useUnifiedTopology: true }, (err) => {
mongoose.connect("mongodb://localhost:27017/justifytext", { useNewUrlParser: true }, { useUnifiedTopology: true }, (err) => {
    if (err) { 
        console.error(err)
    } else {
        console.log("Connected");
    }
});

app.use("/", debug, router)

app.listen(port, () => {
    console.log("Server listening in : ", port)
})