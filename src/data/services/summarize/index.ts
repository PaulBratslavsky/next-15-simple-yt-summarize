import { generateSummary } from "@/data/services/summarize/generate-summary";
import { generateTranscript } from "@/data/services/summarize/generate-transcript";
import { fetchExistingTranscriptAndSummary } from "@/data/services/summarize/fetch-existing-transcript-and-summary";
import { getConfig } from "@/data/services/summarize/get-config";
import { saveTranscript } from "@/data/services/summarize/save-transcript";
import { TranscriptData } from "@/data/services/summarize/types";


export async function summarize(videoId: string, template: string) {
  const strapiConfig = getConfig();
  const existingData = await fetchExistingTranscriptAndSummary(videoId, strapiConfig);

  if (existingData?.data?.length) {
    const { title, thumbnailUrl, fullTranscript, summary } = existingData.data[0];
    return { summary, transcript: fullTranscript, title, thumbnailUrl };
  }

  const transcriptData = await generateTranscript(videoId);
  if (!transcriptData?.fullTranscript) {
    throw new Error("No transcript data found");
  }

  const summary = await generateSummary(transcriptData.fullTranscript, template);

  await saveTranscript({
    videoId,
    fullTranscript: transcriptData.fullTranscript,
    title: transcriptData.title,
    thumbnailUrl: transcriptData.thumbnailUrl,
    transcriptWithTimeCodes: transcriptData.transcriptWithTimeCodes,
    summary: summary as string,
  } as TranscriptData & { videoId: string }, strapiConfig);

  return {
    summary,
    transcript: transcriptData.fullTranscript,
    title: transcriptData.title,
    thumbnailUrl: transcriptData.thumbnailUrl,
  };
}
