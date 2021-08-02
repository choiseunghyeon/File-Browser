function createFile(name) {
  return {
    type: "file",
    name,
  };
}

function createDirectory(name) {
  return {
    type: "dir",
    name,
  };
}

module.exports = {
  createFile,
  createDirectory,
};
