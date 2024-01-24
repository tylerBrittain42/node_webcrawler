const { test, expect } = require("@jest/globals");
const {
  normalizeUrl,
  getURLsFromHTML,
  crawlPage,
  getBaseName,
} = require("./crawl.js");
const {
  html1,
  link1,
  html2,
  link2,
  html3,
  link3,
  crawlExpected,
} = require("./dummy.js");

// normalizeUrls ------------------------------
test("normalizeUrl", () => {
  expect(normalizeUrl("https://blog.boot.dev/path/")).toBe(
    "blog.boot.dev/path",
  );
  expect(normalizeUrl("https://blog.boot.dev/path")).toBe("blog.boot.dev/path");
  expect(normalizeUrl("http://blog.boot.dev/path/")).toBe("blog.boot.dev/path");
  expect(normalizeUrl("http://blog.boot.dev/path")).toBe("blog.boot.dev/path");
});
("blog.boot.dev/path");

// getUrlsFromHTML ------------------------------
test("getUrlsFromHTML single", () => {
  const sampleHtml = html1();
  const sampleLinks = link1();
  const baseUrl = "https://blog.boot.dev";
  expect(getURLsFromHTML(sampleHtml, baseUrl)).toEqual(sampleLinks);
});
test("getUrlsFromHTML multiple", () => {
  const sampleHtml = html2();
  const sampleLinks = link2();
  const baseUrl = "https://blog.boot.dev";
  expect(getURLsFromHTML(sampleHtml, baseUrl)).toStrictEqual(sampleLinks);
});

test("getUrlsFromHTML relative url", () => {
  const sampleHtml = html3();
  const sampleLinks = link3();
  const baseUrl = "https://blog.boot.dev";
  expect(getURLsFromHTML(sampleHtml, baseUrl)).toStrictEqual(sampleLinks);
});

// test("crawlPage success", async () => {
// crawlPage ------------------------------
// test("crawlPage success", async () => {
//   const baseUrl = "https://motherfuckingwebsite.com";
//   const expected = crawlExpected();
//   const recieved = await crawlPage(baseUrl);
//   expect(recieved).toBe(expected);
// });
//
// test("crawlPage bad status", async () => {
//   const baseUrl = "https://blog.boot.dev/sadfasdfasdf/asdfsadfasdfasdfasdf";
//   const recieved = await crawlPage(baseUrl);
//   expect(recieved).toMatch(/status code is/);
// });
//
// test("crawlPage wrong content", async () => {
//   const baseUrl = "https://api.kanye.rest";
//   const recieved = await crawlPage(baseUrl);
//   expect(recieved).toMatch(/content-type is not text\/html/);
// });

test("getHostName success", async () => {
  const url =
    "https://www.boot.dev/assignments/66f7b67c-8e87-42b3-830a-0454ba643959";
  const expected = "www.boot.dev";
  const recieved = getBaseName(url);
  expect(recieved).toMatch(expected);
});

//ADDITIONAL TESTS(not mine)
test("normalizeURL protocol", () => {
  const input = "https://blog.boot.dev/path";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL slash", () => {
  const input = "https://blog.boot.dev/path/";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL capitals", () => {
  const input = "https://BLOG.boot.dev/path";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL http", () => {
  const input = "http://BLOG.boot.dev/path";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML absolute", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = ["https://blog.boot.dev/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = ["https://blog.boot.dev/path/one"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML both", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = [
    "https://blog.boot.dev/path/one",
    "https://other.com/path/one",
  ];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML handle error", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="path/one"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
