const fs = require("fs");

export const readFilePromisified = (path) => {
  return new Promise((res, rej) => {
    fs.readFile(path, { encoding: "utf-8" }, (err, data) => {
      if (err) return rej(err);
      res(data);
    });
  });
};
