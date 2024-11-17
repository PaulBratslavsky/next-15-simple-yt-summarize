export interface StrapiConfig {
  baseUrl: string;
  apiToken: string;
  path: string;
}

export interface TranscriptSegment {
  text: string;
  start: number;
  end: number;
  duration: number;
}

export interface TranscriptData {
  title: string | undefined;
  videoId: string | undefined;
  thumbnailUrl: string | undefined;
  fullTranscript: string | undefined;
  transcriptWithTimeCodes?: TranscriptSegment[]
}

// Add proper types
export interface SummaryData {
  fullTranscript: string;
  title: string;
  thumbnailUrl: string;
  transcriptWithTimeCodes: TranscriptSegment[]
}

export interface YouTubeTranscriptSegment {
  snippet: {
    text: string;
  };
  start_ms: string;
  end_ms: string;
}