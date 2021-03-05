const path = require("path")
const express = require("express");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");

const port = process.env.PORT || 3000;

app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
    res.sendFile('index.html')
})

app.listen(port, () => {
    console.log(`app is listen to port ${port}`);
});