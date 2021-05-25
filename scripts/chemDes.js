/*
 * @Description:
 * @Author: Kotori Y
 * @Date: 2021-05-20 20:28:16
 * @LastEditors: Kotori Y
 * @LastEditTime: 2021-05-25 20:37:09
 * @FilePath: \swarming\scripts\chemDes.js
 * @AuthorMail: kotori@cbdd.me
 */
const fetch = require("node-fetch");
const load = require("./load");
const time = require("./time");
const cheerio = require("cheerio");
const FormData = require("form-data");

async function visit(smiles, tryTimes = 1) {
  try {
    const postUrl = "http://www.scbdd.com/chemopy_desc/index/";

    const form = new FormData();
    form.append("Smiles", smiles);
    form.append("check_box_d", "2D");

    let resp = await fetch(postUrl, {
      method: "POST",
      timeout: 60000,
      body: form,
    });

    let html = await resp.text();
    let $ = cheerio.load(html);
    let table = $(".table-bordered tbody tr td");

    let temp = [];
    table.each((i) => {
      temp.push(table.eq(i).text());
    });
    console.log(`[200] ${temp[temp.length - 1]}`);
    return;
  } catch (e) {
    if (tryTimes < 2) {
      return await visit(smiles, tryTimes++);
    }
    console.log("[x] FAILED");
    return;
  }
}

(async () => {
  let smis = await load.load("data/example.smi");
  smis = smis.slice(0, 15)
  console.log("start");
  for (let smi of smis) {
    visit(smi);
    await time.sleep(500);
  }
})();
