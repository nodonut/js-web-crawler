function printReport(pages) {
  console.log("Starting the report printing process...");
  const sortedPages = sortPages(pages);
  for (const sortedPage of sortedPages) {
    const [url, count] = sortedPage;
    console.log(`Found ${count} internal links to ${url}`);
  }
}

function sortPages(pages) {
  const pagesArr = Object.entries(pages);
  pagesArr.sort((pageA, pageB) => {
    if (pageB[1] === pageA[1]) {
      return pageA[0].localeCompare(pageB[0]);
    }

    return pageB[1] - pageA[1];
  });
  return pagesArr;
}

export { printReport, sortPages };
