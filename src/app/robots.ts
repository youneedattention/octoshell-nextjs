import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get("host") ?? "";
  const isTAT = host.includes("tokyoairporttransfer");

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
          "/*.php",
          "/alphard-top-en.png",
          "/alphard-top-jp.png",
          "/alphard-top-cn.png",
          "/hiace-top-en.png",
          "/hiace-top-jp.png",
          "/hiace-top-cn.png",
        ],
      },
    ],
    sitemap: isTAT
      ? "https://tokyoairporttransfer.com/sitemap.xml"
      : "https://octoshell.jp/sitemap.xml",
    host: isTAT
      ? "https://tokyoairporttransfer.com"
      : "https://octoshell.jp",
  };
}
