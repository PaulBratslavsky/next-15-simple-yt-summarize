import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { summarize } from "@/data/services/summarize";

export const maxDuration = 150;
export const dynamic = "force-dynamic";

const TEMPLATE = `
INSTRUCTIONS: 
  For the this {text} complete the following steps.

  1. Generate a content-based title
  2. Create 5 SEO-optimized alternative titles
  3. Summarize the content with 5 key topics (first-person, conversational tone)
  4. Write a YouTube video description:
     - With headers and sections
     - Including keywords and takeaways
  5. List key points and benefits
  6. Suggest optimal keywords

  Use natural, accessible English throughout.
`.trim();

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const session = await auth();
    if (!session) {
      return Response.json(
        { data: null, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { videoId } = await req.json();

    if (!videoId) {
      return Response.json(
        { data: null, error: "Video ID is required" },
        { status: 400 }
      );
    }

    const result = await summarize(videoId, TEMPLATE);
    return Response.json({ data: result, error: null });
  } catch (error) {
    console.error("Error processing request:", error);
    return Response.json(
      {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
