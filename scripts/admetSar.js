/*
 * @Description:
 * @Author: Kotori Y
 * @Date: 2021-05-19 19:55:47
 * @LastEditors: Kotori Y
 * @LastEditTime: 2021-05-19 21:55:53
 * @FilePath: \swarming\scripts\admetSar.js
 * @AuthorMail: kotori@cbdd.me
 */
const fetch = require("node-fetch");
const load = require("./load");

async function visit(smiles) {
  try {
    const postUrl = "http://lmmd.ecust.edu.cn/admetsar2/result/";
    let body = {
      smis: smiles,
      endpoints: "all",
    };

    let resp = await fetch(postUrl, {
      method: "POST",
      timeout: 1800,
      body: JSON.stringify(body),
    });
    let html = await resp.text();
    console.log(JSON.parse(html)["result"]);
  } catch (err) {
    console.log(err);
  }
}

(async () => {
  const smis = await load.loadSmi();
  console.log("start");
  for (let i = 0; i < smis.length; i += 20) {
    await visit(smis.slice(i, i + 20));
  }
})();
