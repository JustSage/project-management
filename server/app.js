<<<<<<< HEAD
const path = require('path');
const express = require('express');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
=======
const path = require("path")
const express = require("express");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
>>>>>>> 5b1bfb94dc44341710e9b8bfd47af552ef585758

const port = process.env.PORT || 3000;

app.use(express.static(publicDirectoryPath));

<<<<<<< HEAD
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.listen(port, () => {
  console.log(`app is listen to port ${port}`);
});
=======
app.get("/", (req, res) => {
    res.sendFile('index.html')
})

app.listen(port, () => {
    console.log(`app is listen to port ${port}`);
});
>>>>>>> 5b1bfb94dc44341710e9b8bfd47af552ef585758
