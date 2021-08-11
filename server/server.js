var express = require("express");
const fs = require("fs");
const cors = require("cors");

const { createFile, createDirectory } = require("./utils");
var app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.all("/*", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });

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

  res.json(dirList);
});

app.get("/all", function (req, res) {
  const path = req.query.path;

  const list = fs.readdirSync(path, { withFileTypes: true });
  const dirList = list.reduce((arr, filePath) => {
    filePath.isDirectory() ? arr.push(createDirectory(filePath.name)) : arr.push(createFile(filePath.name));
    return arr;
  }, []);

  res.json(dirList);
});

app.delete("/file", function (req, res) {
  const path = req.body.path;
  console.log(req.body);

  try {
    fs.unlinkSync(path);
  } catch (error) {
    res.json("삭제 과정에 문제가 있었습니다.");
  }

  res.json("성공적으로 삭제되었습니다.");
});

app.delete("/folder", function (req, res) {
  const path = req.body.path;
  console.log(req.body);

  try {
    fs.rmdirSync(path, { recursive: true });
  } catch (error) {
    res.json("삭제 과정에 문제가 있었습니다.");
  }

  res.json("성공적으로 삭제되었습니다.");
});

app.listen(5000, function () {
  console.log("Example app listening on port 5000!");
});
