import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/wp-admin/",
          "/wp-content/",
          "/wp-includes/",
          "/wp-login.php",
          "/wp-cron.php",
          "/xmlrpc.php",
          "/comments/",
          "/*.php",
        ],
      },
    ],
    sitemap: "https://octoshell.jp/sitemap.xml",
    host: "https://octoshell.jp",
  };
}
