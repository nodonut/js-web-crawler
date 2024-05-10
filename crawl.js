import { JSDOM } from "jsdom";

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);
  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }

  const normalizedURL = normalizeURL(currentURL);
  if (pages[normalizedURL] > 0) {
    pages[normalizedURL] += 1;
    return pages;
  }

  pages[normalizedURL] = 1;
  let html = "";
  try {
    html = await getHTMLFromURL(currentURL);
  } catch (error) {
    console.log(error.message);
    return pages;
  }
  const urls = getURLsFromHTML(html, baseURL);
  for (const url of urls) {
    await crawlPage(baseURL, url, pages);
  }

  return pages;
}

async function getHTMLFromURL(url) {
  let res;
  try {
    res = await fetch(url);
  } catch (error) {
    throw new Error(`Error while fetch: ${error.message}`);
  }

  if (res.status > 399) {
    throw new Error(`Got HTTP error: ${res.status} ${res.statusText}`);
  }

  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("text/html")) {
    throw new Error(`Got non-HTML response: ${contentType}`);
  }

  return res.text();
}

function getURLsFromHTML(htmlBody, baseURL) {
  const links = [];
  const dom = new JSDOM(htmlBody);
  const anchors = Array.from(dom.window.document.querySelectorAll("a"));
  for (const anchor of anchors) {
    if (anchor.hasAttribute("href")) {
      let href = anchor.getAttribute("href");
      try {
        href = new URL(href, baseURL).href;
        links.push(href);
      } catch (error) {
        console.error(`${error.message}: ${href}`);
      }
    }
  }
  return links;
}

function normalizeURL(url) {
  const urlObj = new URL(url);
  let fullPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (fullPath.slice(-1) === "/") {
    fullPath = fullPath.slice(0, -1);
  }
  return fullPath;
}

export { normalizeURL, getURLsFromHTML, crawlPage };
