"use client";
import React from "react";

import { useState } from "react";
import { toast } from "sonner";
import { extractYouTubeID } from "@/lib/utils";

import { generateSummaryService } from "@/data/services/summary-service";
import { SummaryForm } from "@/components/forms/summary-form";

import SummaryCard from "@/components/custom/summary-card";
const INITIAL_STATE = {
  message: null,
  name: "",
};

interface StrapiErrorsProps {
  message: string | null;
  name: string;
}

interface SummaryDataProps {
  title: string;
  videoId: string;
  summary: string;
  transcript: string;
}

export function Summarize() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<StrapiErrorsProps>(INITIAL_STATE);
  const [value, setValue] = useState<string>("");
  const [summaryData, setSummaryData] = useState<SummaryDataProps | null>(null);

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const videoId = formData.get("videoId") as string;

    const processedVideoId = extractYouTubeID(videoId);

    if (!processedVideoId) {
      toast.error("Invalid Youtube Video ID");
      setLoading(false);
      setValue("");
      setError({
        ...INITIAL_STATE,
        message: "Invalid Youtube Video ID",
        name: "Invalid Id",
      });
      return;
    }

    toast.success("Generating Summary");

    const summaryResponseData = await generateSummaryService(processedVideoId);

    if (summaryResponseData.error) {
      setValue("");
      toast.error(summaryResponseData.error);
      setError({
        ...INITIAL_STATE,
        message: summaryResponseData.error,
        name: "Summary Error",
      });
      setLoading(false);
      return;
    }

    const data = {
      title: `Summary for video: ${processedVideoId}`,
      videoId: processedVideoId,
      summary: summaryResponseData?.data?.summary,
      transcript: summaryResponseData?.data?.transcript,
    };

    setSummaryData({ ...data });

    setLoading(false);
  }

  function clearError() {
    setError(INITIAL_STATE);
    if (error.message) setValue("");
  }
  return (
    <div className="w-full">
      <div className="flex gap-2 w-full justify-center items-center">
        <SummaryForm
          error={error}
          value={value}
          setValue={setValue}
          loading={loading}
          handleFormSubmit={handleFormSubmit}
          clearError={clearError}
        />
      </div>
      {summaryData && <SummaryCard summaryData={summaryData} />}
    </div>
  );
}
