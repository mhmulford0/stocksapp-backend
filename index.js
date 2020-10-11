require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const userRouter = require("./routes/user/");

app.use(express.json());
const corsOptions = {
  origin: "https://www.google.com",
  methods: "GET,PUT,POST,DELETE",
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));



app.use("/api/user", userRouter);

app.get("/", (req, res) => {

  res.status(200).json({ message: "API is up and running" });

  
});

const port = process.env.PORT || 3400;

app.listen(port);
