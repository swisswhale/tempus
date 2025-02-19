const express = require('express');

const app = express();

app.get("/", async (req, res) => {
    res.render("home.ejs");
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
});