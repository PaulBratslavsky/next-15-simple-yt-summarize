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
    thumbnailUrl: string;
  };
}

export default function SummaryCard({ summaryData }: SummaryCardProps) {
  const { videoId, summary, transcript, title, thumbnailUrl } = summaryData;
  return (
    <div className="h-full max-w-[960px] mx-auto w-full py-8">
      <div className="flex items-center gap-4 mb-8">
        {thumbnailUrl && <img src={thumbnailUrl} alt="YouTube Thumbnail" width={200} height={100} className="rounded-xl"/>}
        <h2 className="text-2xl font-bold text-left">{title}</h2>
      </div>
      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-3 border-2 p-4 border-gray-900 rounded-xl">
          <ScrollArea className="h-[800px]">
          <ReactMarkdown className="markdown-preview">{summary}</ReactMarkdown>
        </ScrollArea>
      </div>
      <div className="col-span-2 border-2 p-4 border-gray-900 rounded-xl">
        <ClientYouTubePlayer
          videoId={videoId as string}
        />
        <ScrollArea className="h-[600px] m-4">
          <ReactMarkdown className="markdown-preview">
            {transcript}
          </ReactMarkdown>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
