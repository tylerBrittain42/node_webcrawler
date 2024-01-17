const { test, expect } = require("@jest/globals");
const { normalizeUrl } = require("./crawl.js");

test("normalizeUrl", () => {
  expect(normalizeUrl("https://blog.boot.dev/path/")).toBe(
    "blog.boot.dev/path",
  );
  expect(normalizeUrl("https://blog.boot.dev/path")).toBe("blog.boot.dev/path");
  expect(normalizeUrl("http://blog.boot.dev/path/")).toBe("blog.boot.dev/path");
  expect(normalizeUrl("http://blog.boot.dev/path")).toBe("blog.boot.dev/path");
});
