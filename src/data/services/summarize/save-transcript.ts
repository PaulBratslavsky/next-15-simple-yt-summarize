import { StrapiConfig, TranscriptData } from "./types";

export async function saveTranscript(
  data: TranscriptData & { videoId: string },
  config: StrapiConfig
) {
  const saveUrl = new URL(config.path, config.baseUrl);
  const payload = {
    data: {...data},
  };

  const response = await fetch(saveUrl.href, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Failed to save summary to Strapi: ${response.statusText}`);
  }

  return response.json();
}
