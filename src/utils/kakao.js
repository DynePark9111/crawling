const puppeteer = require("puppeteer");
const {
  logTime,
  getMongoDB,
  getUniqueObjectFromArray,
  postMongoDB,
} = require("./functions");
require("dotenv").config();
const KakaoURL = "https://webtoon.kakao.com/original-webtoon";
const ID_KAKAO = process.env.ID_KAKAO;
const PW_KAKAO = process.env.PW_KAKAO;

const openBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    ignoreDefaultArgs: ["--enable-automation"],
    args: ["window-sieze=1920,108000"],
    slowMo: 50,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 108000 });
  return [browser, page];
};

const closeBrowser = async (browser) => {
  await browser.close();
};

const loginKakao = async (page) => {
  await Promise.all([
    page.goto("https://webtoon.kakao.com/more"),
    page.waitForNavigation(),
  ]);
  await page.$eval("a.items-start", (btn) => btn.click());
  await page.$eval(
    "button.relative.px-10.py-0.btn-transparent-grey-06",
    (btn) => btn.click()
  );
  await page.waitForSelector("input#id_email_2.tf_g.tf_email");
  await page.type("input#id_email_2.tf_g.tf_email", ID_KAKAO);
  await page.type("input#id_password_3.tf_g", PW_KAKAO);
  await page.keyboard.press("Enter");
  await page.waitForSelector("div.py-13");
  await new Promise(function (resolve) {
    setTimeout(resolve, 2000);
  });
  await Promise.all([
    page.goto(
      "https://webtoon.kakao.com/content/%EB%AA%BB%ED%95%A0-%EC%A7%93/2940"
    ),
    page.waitForNavigation(),
  ]);
};

const getUpdatedListKakao = async () => {
  const [browser, page] = await openBrowser();
  await Promise.all([page.goto(KakaoURL), page.waitForNavigation()]);
  const xPath = `//p[@class="whitespace-pre-wrap break-all break-words support-break-word font-badge !whitespace-nowrap mx-2 s11-bold-dark-red bg-white px-6"]/ancestor::a[@class="w-full h-full relative overflow-hidden before:absolute before:inset-0 before:bg-grey-01 before:-z-1"]`;
  let $webtoonList = await page.$x(xPath);
  let webtoonsLength = $webtoonList.length;
  closeBrowser(browser);
  return webtoonsLength;
};

const getPrimaryDataKakao = async () => {
  const [browser, page] = await openBrowser();
  await Promise.all([page.goto(KakaoURL), page.waitForNavigation()]);
  const xPath = `//p[@class="whitespace-pre-wrap break-all break-words support-break-word font-badge !whitespace-nowrap mx-2 s11-bold-dark-red bg-white px-6"]/ancestor::a[@class="w-full h-full relative overflow-hidden before:absolute before:inset-0 before:bg-grey-01 before:-z-1"]`;
  const $webtoonList = await page.$x(xPath);
  const webtoonsBasic = [];

  for (webtoon of $webtoonList) {
    let link = await page.evaluate((el) => el.getAttribute("href"), webtoon);
    let title = link.substring(9, link.length - 5).replaceAll("-", " ");
    let image = await page.evaluate(
      (el) => el.querySelector("picture img.object-cover")?.getAttribute("src"),
      webtoon
    );
    if (link && title && image) {
      webtoonsBasic.push({
        link: `https://webtoon.kakao.com${link}`,
        title,
        image,
      });
    }
  }
  closeBrowser(browser);
  return webtoonsBasic;
};

const updateKakao = async () => {
  // const [browser, page] = await openBrowser();
  // loginKakao(page);
  // const xPath = `(//p[@class="whitespace-pre-wrap break-all break-words support-break-word font-badge !whitespace-nowrap absolute left-2 top-2 s10-bold-black bg-white border border-solid border-black/25 px-5"])[1]/preceding-sibling::picture`;
  const webtoonsBasic = await getPrimaryDataKakao();
  const webtoons = [];

  for (webtoon of webtoonsBasic) {
    // await Promise.all([
    //   page.goto(webtoon.link, { waitUntil: "domcontentloaded" }),
    //   page.waitForNavigation(),
    //   page.waitForSelector("img"),
    // ]);
    let episodeLink = webtoon.link;
    let episodeTitle = webtoon.title;
    let platform = "kakao";
    webtoons.push({
      episodeTitle,
      episodeLink,
      platform,
      ...webtoon,
    });
    // let $webtoonLatest = await page.$x(xPath);
    // if ($webtoonLatest[0]) {
    //   let episodeTitle = await page.evaluate(
    //     (el) =>
    //       el
    //         .querySelector("img.w-full.h-full.object-cover")
    //         .getAttribute("alt"),
    //     $webtoonLatest[0]
    //   );
    //   webtoons.push({
    //     episodeTitle,
    //     episodeLink,
    //     platform,
    //     ...webtoon,
    //   });
    // } else {
    //   webtoons.push({
    //     episodeTitle,
    //     episodeLink,
    //     platform,
    //     ...webtoon,
    //   });
    // }
  }
  // closeBrowser(browser);
  return webtoons;
};

const checkAndUpdateKakao = async () => {
  const [dbData, webtoonsLength] = await Promise.all([
    getMongoDB("kakao"),
    getUpdatedListKakao(),
  ]);

  if (webtoonsLength !== dbData.length) {
    const crawled = await updateKakao();
    const onlyNew = getUniqueObjectFromArray([...dbData, ...crawled]);
    if (onlyNew.length === 0) {
      message = `Kakao | Everything is up to Date. There's nothing to upload`;
      logTime(message);
      return message;
    }
    postMongoDB(onlyNew);
    logTime(`Kakao | uploaded: ${onlyNew.length}`);
    return onlyNew.length;
  } else {
    logTime(`Kakao | Nothing to upload`);
    return 0;
  }
};

module.exports = {
  getUpdatedListKakao,
  updateKakao,
  checkAndUpdateKakao,
};
