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

async function crawlPage(baseUrl) {
  const resp = await fetch(baseUrl, {
    method: "GET",
    "content-type": "text/html",
  });
  try {
    // console.log(resp);
    if (!resp.headers.get("content-type").includes("text/html")) {
      throw new Error("content-type is not text/html");
    }
    if (resp.status >= 400) {
      throw new Error(`status code is ${resp.status}`);
    }
    return await resp.text();
  } catch (error) {
    console.log(`error:${error}`);
    return `error:${error}`;
  }
}

module.exports = {
  normalizeUrl,
  getURLsFromHTML,
  crawlPage,
};
