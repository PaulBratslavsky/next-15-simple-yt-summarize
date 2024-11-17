import { NextRequest } from "next/server";
import { auth } from "@/auth";

import { generateSummary } from "@/data/services/generate-summary";
import { generateTranscript } from "@/data/services/generate-transcript";

export const maxDuration = 150;
export const dynamic = "force-dynamic";

const TEMPLATE = `
INSTRUCTIONS: 
  For the this {text} complete the following steps.
  Generate the title for based on the content provided.
  Generate 5 catchy and SEO friendly attention grabbing titles.
  Summarize the following content and include 5 key topics, writing in first person using normal tone of voice.
  
  Write a youtube video description
    - Include heading and sections.  
    - Incorporate keywords and key takeaways

  Generate bulleted list of key points and benefits

  Return possible and best recommended keywords

  Write in normal tone of voice using common English.
`;


export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return new Response(
      JSON.stringify({ data: null, error: "Not authenticated" }),
      { status: 401 }
    );
  }


  const body = await req.json();
  const videoId = body.videoId;

  let transcriptData;

  try {
    transcriptData  = await generateTranscript(videoId);
    console.dir(transcriptData, { depth: null });
  } catch (error) {
    console.error("Error processing request:", error);
    if (error instanceof Error)
      return new Response(JSON.stringify({ error: error.message }));
    return new Response(JSON.stringify({ error: "Unknown error" }));
  }

  const transcript = transcriptData?.fullTranscript;
  const title = transcriptData?.title;
  const thumbnailUrl = transcriptData?.thumbnailUrl;

  if (!transcript) throw new Error("No transcript data found");
  
  let summary: Awaited<ReturnType<typeof generateSummary>>;

  try {
    summary = await generateSummary(transcript, TEMPLATE);
    return new Response(
      JSON.stringify({ data: { summary, transcript, title, thumbnailUrl }, error: null })
    );
  } catch (error) {
    console.error("Error processing request:", error);
    if (error instanceof Error)
      return new Response(JSON.stringify({ error: error.message }));
    return new Response(JSON.stringify({ error: "Error generating summary." }));
  }
}