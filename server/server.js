const express = require("express");
const bodyParser = require("body-parser");
const { db } = require("./config/database");
const authRouter = require("./routes/auth.route");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
    res.send("Hello!");
});

app.listen(3000, async () => {
    console.log("App is listening on Port 3000");
});