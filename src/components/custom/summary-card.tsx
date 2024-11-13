import React from "react";
import ReactMarkdown from "react-markdown";

import ClientYouTubePlayer from "@/components/custom/client-youtube-player";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SummaryCardProps {
  summaryData: { title: string; videoId: string; summary: string };
}

export default function SummaryCard({ summaryData }: SummaryCardProps) {
  const { videoId, summary } = summaryData;
  return (
    <div className="h-full max-w-[960px] mx-auto grid gap-6 grid-cols-5 w-full py-8">
      <div className="col-span-3">
        <ScrollArea className="h-[600px]">
          <ReactMarkdown className="markdown-preview">
            {summary}
          </ReactMarkdown>
        </ScrollArea>
      </div>
      <div className="col-span-2">
        <ClientYouTubePlayer videoId={videoId as string} />
      </div>
    </div>
  );
}
