const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { db } = require("./config/database");
const authRouter = require("./routes/auth.route");
const customerRouter = require("./routes/customer.route");
const promotionRouter = require("./routes/promotion.route");
const categoryRouter = require("./routes/category.route");

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/promotions", promotionRouter);
app.use("/api/v1/categories", categoryRouter);


app.get("/", (req, res) => {
    res.send("Hello!");
});

app.listen(3000, async () => {
    console.log("App is listening on Port 3000");
});