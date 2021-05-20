/*
 * @Description:
 * @Author: Kotori Y
 * @Date: 2021-05-20 11:42:26
 * @LastEditors: Kotori Y
 * @LastEditTime: 2021-05-20 11:51:48
 * @FilePath: \swarming\scripts\time.js
 * @AuthorMail: kotori@cbdd.me
 */


async function sleep(delay = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

module.exports = { sleep };