import type { MetadataRoute } from "next";
import store from "@/content/content-store.json";

const stableRoutes = ["/assessment/", "/product/", "/guides/", "/faq/"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return stableRoutes.map((path) => ({
    url: new URL(path, store.site.domain).toString(),
    lastModified: new Date(store.updatedAt)
  }));
}
