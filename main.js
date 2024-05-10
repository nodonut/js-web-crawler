import { crawlPage } from "./crawl.js";
import { printReport } from "./report.js";

async function main() {
  const args = process.argv;
  if (args.length < 3 || args.length > 3) {
    console.error("invalid argument");
    process.exit();
  }
  const baseURL = args[2];
  const pages = await crawlPage(baseURL);
  printReport(pages);
}

await main();
