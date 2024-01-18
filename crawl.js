// const url = require('node:url')

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

module.exports = {
  normalizeUrl,
};
