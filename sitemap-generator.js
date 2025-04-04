import { writeFileSync } from "fs";
import { SitemapStream, streamToPromise } from "sitemap";

// Define your website pages
const pages = [
  { url: "/", changefreq: "monthly", priority: 1.0 },

  { url: "/boutique", changefreq: "weekly", priority: 0.9 },
];

(async () => {
  const sitemap = new SitemapStream({
    hostname: "https://houwari-portfolio-eight.vercel.app",
  });

  pages.forEach((page) => sitemap.write(page));

  sitemap.end();

  const data = await streamToPromise(sitemap);
  writeFileSync("./public/sitemap.xml", data.toString());

  console.log("✅ Sitemap generated successfully!");
})();
