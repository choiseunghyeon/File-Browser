var express = require("express");
var app = express();
const fs = require("fs");

app.get("/dir", function (req, res) {
  const path = req.query.path;

  const list = fs.readdirSync(path, { withFileTypes: true });
  const result = list.reduce((arr, file) => {
    if (file.isDirectory()) {
      console.log(file);
      arr.push(file);
    }
    return arr;
  }, []);
  res.send(result);
});

app.get("/all", function (req, res) {
  const path = req.query.path;
  const hiddenFilePattern = /(^|\/)\.[^\/\.]/g;
  const list = fs.readdirSync(path, { withFileTypes: true });
  const result = list.filter(file => {
    console.dir(file);
    return !hiddenFilePattern.test(file.name);
  }, []);
  res.send(result);
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
