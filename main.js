const { crawlPage } = require("./crawl");

async function main() {
  console.log("lmao");
  console.log(process.argv);
  if (process.argv.length !== 3) {
    console.log("error, improper number of args");
  } else {
    const baseUrl = process.argv[2];
    console.log(await crawlPage(baseUrl));
  }
}

main();
