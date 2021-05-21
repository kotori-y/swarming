/*
 * @Description:
 * @Author: Kotori Y
 * @Date: 2021-05-20 20:28:16
 * @LastEditors: Kotori Y
 * @LastEditTime: 2021-05-21 10:06:42
 * @FilePath: \swarming\scripts\chemDes.js
 * @AuthorMail: kotori@cbdd.me
 */
const fetch = require("node-fetch");
const load = require("./load");
const time = require("./time");
const fs = require("fs");
const FormData = require("form-data");

async function visit(filePath = `path/to/file.smi`) {
  const postUrl = "http://www.scbdd.com/chemopy_desc/chemopy-calc-list/";

  const fileStream = fs.createReadStream(filePath);
  const form = new FormData();
  form.append("tempfile", fileStream);
  form.append("check_box_d", "2D");

  let resp = await fetch(postUrl, {
    method: "POST",
    timeout: 20000000,
    body: form,
  });

  await resp.text();
}

(async () => {
  await visit("../data/chemsar.smi");
})();