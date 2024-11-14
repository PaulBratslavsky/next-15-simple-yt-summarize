import React from "react";
import ReactMarkdown from "react-markdown";

import ClientYouTubePlayer from "@/components/custom/client-youtube-player";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SummaryCardProps {
  summaryData: {
    title: string;
    videoId: string;
    summary: string;
    transcript: string;
  };
}

export default function SummaryCard({ summaryData }: SummaryCardProps) {
  const { videoId, summary, transcript } = summaryData;
  return (
    <div className="h-full max-w-[960px] mx-auto grid gap-6 grid-cols-5 w-full py-8">
      <div className="col-span-3 border-2 p-4 border-gray-900 rounded-xl">
        <ScrollArea className="h-[800px]">
          <ReactMarkdown className="markdown-preview">{summary}</ReactMarkdown>
        </ScrollArea>
      </div>
      <div className="col-span-2 border-2 p-4 border-gray-900 rounded-xl">
        <ClientYouTubePlayer videoId={videoId as string} />
        <ScrollArea className="h-[500px] m-4">
          <ReactMarkdown className="markdown-preview">
            {transcript}
          </ReactMarkdown>
        </ScrollArea>
      </div>
    </div>
  );
}
