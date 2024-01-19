const { JSDOM } = require("jsdom");

function normalizeUrl(url) {
  const urlObj = new URL(url);
  let normalized = urlObj.hostname;
  if (url[url.length - 1] == "/") {
    normalized += urlObj.pathname.slice(0, urlObj.pathname.length - 1);
  } else {
    normalized += urlObj.pathname;
  }
  return normalized;
}
function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const urlTags = dom.window.document.querySelectorAll("a");
  urlTags.forEach((url) => {
    let href = url.href;
    if (!href.includes(baseURL)) {
      href = baseURL + href;
    }
    urls.push(href);
    // urls.push(url.href)
  });
  return urls;
}
module.exports = {
  normalizeUrl,
  getURLsFromHTML,
};
