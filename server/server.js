var express = require("express");
const fs = require("fs");
const { createFile, createDirectory } = require("./utils");
var app = express();
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/dir", function (req, res) {
  const path = req.query.path;

  const list = fs.readdirSync(path, { withFileTypes: true });
  const dirList = list.reduce((arr, filePath) => {
    console.dir(filePath);
    if (filePath.isDirectory()) {
      arr.push(filePath);
    }
    return arr;
  }, []);

  res.send(dirList);
});

app.get("/all", function (req, res) {
  const path = req.query.path;

  const list = fs.readdirSync(path, { withFileTypes: true });
  const dirList = list.reduce((arr, filePath) => {
    filePath.isDirectory() ? arr.push(createDirectory(filePath.name)) : arr.push(createFile(filePath.name));
    return arr;
  }, []);

  res.send(dirList);
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
