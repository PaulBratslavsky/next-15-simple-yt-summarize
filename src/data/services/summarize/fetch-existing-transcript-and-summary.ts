import qs from "qs";
import { StrapiConfig } from "./types";
export async function fetchExistingTranscriptAndSummary(videoId: string, config: StrapiConfig) {
  const url = new URL(config.path, config.baseUrl);
  url.search = qs.stringify({ filters: { videoId: { $eq: videoId } } });

  const response = await fetch(url.href, {
    headers: { Authorization: `Bearer ${config.apiToken}` },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch transcript from Strapi");
  }

  return response.json();
}