import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

test("normalizeURL", () => {
  let normalizedUrl = normalizeURL("https://blog.boot.dev/path/");
  expect(normalizedUrl).toEqual("blog.boot.dev/path");

  normalizedUrl = normalizeURL("https://blog.boot.dev/path");
  expect(normalizedUrl).toEqual("blog.boot.dev/path");

  normalizedUrl = normalizeURL("http://blog.boot.dev/path/");
  expect(normalizedUrl).toEqual("blog.boot.dev/path");

  normalizedUrl = normalizeURL("http://blog.boot.dev/path");
  expect(normalizedUrl).toEqual("blog.boot.dev/path");
});

test("getURLsFromHTML", () => {
  const baseURL = "https://boot.dev";
  const html = `
<html>
    <body>
        <a href="https://boot.dev/home"><span>Go to Boot.dev</span></a>
        <a href="/about"><span>Go to About page</span></a>
        <a href="/contact"><span>Go to Contact page</span></a>
        <a href="/mail"><span>Go to Mail page</span></a>
        <a href="/blog"><span>Go to Blog</span></a>
    </body>
</html>
    `;

  const urls = getURLsFromHTML(html, baseURL);
  expect(urls).toEqual([
    "https://boot.dev/home",
    "https://boot.dev/about",
    "https://boot.dev/contact",
    "https://boot.dev/mail",
    "https://boot.dev/blog",
  ]);
});
