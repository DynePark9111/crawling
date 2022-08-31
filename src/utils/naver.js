const cheerio = require("cheerio");
const {
  logTime,
  getMongoDB,
  getUniqueObjectFromArray,
  postMongoDB,
  getHTML,
} = require("./functions");
const NaverURL = "https://comic.naver.com/webtoon/weekday";

const getUpdatedListNaver = async () => {
  const html = await getHTML(NaverURL);
  const $ = cheerio.load(html.data);
  const $webtoonList = $(".ico_updt");
  const webtoonsLength = $webtoonList.length;
  return webtoonsLength;
};

const getPrimaryData = async () => {
  const html = await getHTML(NaverURL);
  const $ = cheerio.load(html.data);
  const $webtoonList = $(".ico_updt");
  const webtoons = [];
  $webtoonList.each((index, node) => {
    const title = $(node).siblings("img").attr("title");
    const image = $(node).siblings("img").attr("src");
    const link = $(node).parent("a").attr("href");
    if (title && image && link) {
      webtoons.push({ title, image, link });
    } else {
      console.log(`Naver webtoon updated failed: ${index}`);
    }
  });
  return webtoons;
};

const getLatestData = async (url) => {
  const html = await getHTML(`https://comic.naver.com${url}`);
  $ = cheerio.load(html.data);
  const $newEpisode = $(".title:eq(1)");
  const episodeTitle = $newEpisode.children("a").text();
  const episodeLink = $newEpisode.children("a").attr("href");
  return [episodeTitle, episodeLink];
};

const UpdateNaver = async () => {
  const webtoons = await getPrimaryData();
  for (const [index, element] of webtoons.entries()) {
    const [episodeTitle, episodeLink] = await getLatestData(element.link);
    webtoons[index].episodeTitle = episodeTitle;
    webtoons[index].episodeLink = episodeLink;
    webtoons[index].platform = "naver";
  }
  return webtoons;
};

const checkAndUpdateNaver = async () => {
  const [dbData, webtoonsLength] = await Promise.all([
    getMongoDB("naver"),
    getUpdatedListNaver(),
  ]);
  if (webtoonsLength !== dbData.length) {
    const crawled = await UpdateNaver();
    const onlyNew = getUniqueObjectFromArray([...dbData, ...crawled]);
    postMongoDB(onlyNew);
    logTime(`Naver | uploaded: ${onlyNew.length}`);
    return onlyNew.length;
  } else {
    logTime(`Naver | Nothing to upload`);
    return 0;
  }
};

module.exports = {
  getUpdatedListNaver,
  UpdateNaver,
  checkAndUpdateNaver,
};
