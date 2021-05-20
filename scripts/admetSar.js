/*
 * @Description:
 * @Author: Kotori Y
 * @Date: 2021-05-19 19:55:47
 * @LastEditors: Kotori Y
 * @LastEditTime: 2021-05-20 11:58:41
 * @FilePath: \swarming\scripts\admetSar.js
 * @AuthorMail: kotori@cbdd.me
 */
const fetch = require("node-fetch");
const load = require("./load");
const time = require("./time");

async function visit(smiles) {
  try {
    const postUrl = "http://lmmd.ecust.edu.cn/admetsar2/result/";
    let body = {
      smis: smiles,
      endpoints: "all",
    };

    let resp = await fetch(postUrl, {
      method: "POST",
      timeout: 5000,
      body: JSON.stringify(body),
    });
    let html = await resp.text();
    console.log(JSON.parse(html)["result"]);
  } catch (e) {
    console.log(":x: FAILED");
  }
}

(async () => {
  const smis = await load.loadSmi();
  console.log("start");
  for (let i = 0; i < smis.length; i += 20) {
    await visit(smis.slice(i, i + 20));
    await time.sleep(500)
  }
})();
