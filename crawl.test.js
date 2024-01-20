const { test, expect } = require("@jest/globals");
const { normalizeUrl, getURLsFromHTML, crawlPage } = require("./crawl.js");
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
  expect(getURLsFromHTML(sampleHtml, baseUrl)).toStrictEqual(sampleLinks);
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

// crawlPage ------------------------------
test("crawlPage success", async () => {
  const baseUrl = "https://motherfuckingwebsite.com";
  const expected = crawlExpected();
  const recieved = await crawlPage(baseUrl);
  expect(recieved).toBe(expected);
});

test("crawlPage bad status", async () => {
  const baseUrl = "https://blog.boot.dev/sadfasdfasdf/asdfsadfasdfasdfasdf";
  const recieved = await crawlPage(baseUrl);
  expect(recieved).toMatch(/status code is/);
});

test("crawlPage wrong content", async () => {
  const baseUrl = "https://api.kanye.rest";
  const recieved = await crawlPage(baseUrl);
  expect(recieved).toMatch(/content-type is not text\/html/);
});
