const { crawlPage } = require("./crawl");
const { printReport } = require("./report");

async function main() {
  if (process.argv.length !== 3) {
    console.log("error, improper number of args");
  } else {
    const baseUrl = process.argv[2];
    const pages = await crawlPage(baseUrl, baseUrl, {});
    printReport(pages);
  }
}

main();
