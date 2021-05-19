/*
 * @Description:
 * @Author: Kotori Y
 * @Date: 2021-05-19 19:55:47
 * @LastEditors: Kotori Y
 * @LastEditTime: 2021-05-19 20:39:05
 * @FilePath: \swarming\scripts\admetSar.js
 * @AuthorMail: kotori@cbdd.me
 */
const fetch = require("node-fetch");
const load = require("./load");

async function visit(smiles) {
  const postUrl = "http://lmmd.ecust.edu.cn/admetsar2/result/";
  let body = {
    smis: smiles,
    endpoints: "all",
  };

  let resp = await fetch(postUrl, {
    method: "POST",
    timeout: 180000000,
    body: JSON.stringify(body),
  });
  let html = await resp.text();
  console.log(JSON.parse(html)["result"]);
}

(async () => {
  const smis = await load.loadSmi();
  for (let i = 0; i < smis.length; i+= 20) {
    visit(smis.slice(i, i+20))
  }
})();
