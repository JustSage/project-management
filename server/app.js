const path = require("path");
const express = require("express");
const userRouter = require("./routers/user")

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");

const port = process.env.PORT || 3001;

app.use(express.static(publicDirectoryPath));
app.use(userRouter);
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.listen(port, () => {
  console.log(`App is listen to port ${port}`);
});
