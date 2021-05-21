/*
 * @Description:
 * @Author: Kotori Y
 * @Date: 2021-05-19 08:59:47
 * @LastEditors: Kotori Y
 * @LastEditTime: 2021-05-21 14:36:04
 * @FilePath: \swarming\scripts\load.js
 * @AuthorMail: kotori@cbdd.me
 */
const fs = require("fs");

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

async function load(filePath = "path/to/file.any", encoding = "utf8") {
  let data = fs.readFileSync(filePath, encoding);
  let lines = data.toString();
  lines = lines.split("\r\n");
  lines = shuffle(lines);
  
  return lines;
}

module.exports = { loadSmi };