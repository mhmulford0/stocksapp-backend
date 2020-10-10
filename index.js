require("dotenv").config();
const express = require("express");

const userRouter = require("./routes/user/");
const app = express();

app.use(express.json());
app.use("/api/user", userRouter);

app.get("/", (req, res) => {

  res.status(200).json({ message: "API is up and running" });

  
});

const port = process.env.PORT || 3400;

app.listen(port);
