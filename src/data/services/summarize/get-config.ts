interface StrapiConfig {
  baseUrl: string;
  apiToken: string;
  path: string;
}

export const getConfig = (): StrapiConfig => {
  const baseUrl = process.env.STRAPI_URL;
  const apiToken = process.env.STRAPI_API_TOKEN;

  if (!baseUrl || !apiToken) {
    throw new Error("Strapi URL or API token not found");
  }

  return {
    baseUrl,
    apiToken,
    path: "/api/video-summaries",
  };
};