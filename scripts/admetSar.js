/*
 * @Description:
 * @Author: Kotori Y
 * @Date: 2021-05-19 19:55:47
 * @LastEditors: Kotori Y
 * @LastEditTime: 2021-05-21 15:00:19
 * @FilePath: \swarming\scripts\admetSar.js
 * @AuthorMail: kotori@cbdd.me
 */
const fetch = require("node-fetch");
const load = require("./load");
const time = require("./time");

async function visit(smiles, tryTimes = 1) {
  try {
    const postUrl = "http://lmmd.ecust.edu.cn/admetsar2/result/";
    let body = {
      smis: smiles,
      endpoints: "all",
    };

    let resp = await fetch(postUrl, {
      method: "POST",
      timeout: 2000,
      body: JSON.stringify(body),
    });
    let html = await resp.text();
    console.log(JSON.parse(html)["result"]);
    return;
  } catch (e) {
    if (tryTimes <= 5) {
      await time.sleep(1000);
      return await visit(smiles, tryTimes++);
    }
    console.log("❌ FAILED");
  }
}

(async () => {
  const smis = await load.load("data/example.smi");
  console.log("start");
  for (let i = 0; i < smis.length; i += 20) {
    await visit(smis.slice(i, i + 20));
    await time.sleep(500);
  }
})();
