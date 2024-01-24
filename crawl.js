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
  for (const url of urlTags) {
    if (url.href.slice(0, 1) === "/") {
      try {
        urls.push(new URL(url.href, baseURL).href);
      } catch (err) {
        console.log(`${err.message}: ${url.href}`);
      }
    } else {
      try {
        urls.push(new URL(url.href).href);
      } catch (err) {
        console.log(`${err.message}: ${url.href}`);
      }
    }
  }
  return urls;

  // console.log('url-------------')
  // console.log(urls)
  // console.log('end url-------------')
}

function getBaseName(url) {
  const urlObj = new URL(url);
  return urlObj.host;
}

async function crawlPage(baseUrl, currentUrl, pages) {
  const baseUrlobj = new URL(baseUrl);
  const currentUrlobj = new URL(currentUrl);

  if (currentUrlobj.hostname !== baseUrlobj.hostname) {
    return pages;
  }
  const normCurrent = normalizeUrl(currentUrl);

  if (pages[normCurrent] > 0) {
    pages[normCurrent]++;
    return pages;
  }

  pages[normCurrent] = 1;

  console.log(`crawling ${currentUrl}`);
  let htmlBody = "";
  try {
    const resp = await fetch(currentUrl, {
      method: "GET",
      "content-type": "text/html",
    });
    if (!resp.headers.get("content-type").includes("text/html")) {
      console.log("content-type is not text/html");
      return pages;
    }
    if (resp.status >= 400) {
      console.log(`status code is ${resp.status}`);
      return pages;
    }
    htmlBody = await resp.text();
    const toExplore = getURLsFromHTML(htmlBody, baseUrl);
    for (url in toExplore) {
      crawlPage(baseUrl, currentUrl, pages);
    }
  } catch (error) {
    console.log(`error:${error}`);
  }
  const nextURLs = getURLsFromHTML(htmlBody, baseUrl);
  for (const url of nextURLs) {
    pages = await crawlPage(baseUrl, url, pages);
  }
  return pages;
}

module.exports = {
  normalizeUrl,
  getURLsFromHTML,
  crawlPage,
  getBaseName,
};
