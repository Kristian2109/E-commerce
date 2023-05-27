const express = require("express");
const bodyParser = require("body-parser");
const connectDatabase = require("./config/database");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.send("Hellooo");
});


app.listen(3000, async () => {
    await connectDatabase();
    console.log("App is listening on Port 3000");
});