"use client";

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/custom/submit-button";
import { BorderBeam } from "../magicui/border-beam";

interface StrapiErrorsProps {
  message: string | null;
  name: string;
}

interface SummaryFormProps {
  error: StrapiErrorsProps;
  value: string;
  setValue: (value: string) => void;
  loading: boolean;
  clearError: () => void;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function SummaryForm({
  error,
  value,
  setValue,
  loading,
  handleFormSubmit,
  clearError,
}: SummaryFormProps) {
  const errorStyles = error.message
    ? "outline-1 outline outline-pink-400 placeholder:text-pink-700"
    : "";

  return (
    <div className="relative m-1 w-full max-w-[960px]">

      <form
        onSubmit={handleFormSubmit}
        className="relative flex gap-2 items-center justify-center rounded-xl"
      >
            <BorderBeam size={200} anchor={90} duration={10} borderWidth={1.5} />

        <Input
          name="videoId"
          placeholder={
            error.message ? error.message : "Youtube Video ID or URL"
          }
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onMouseDown={clearError}
          className={cn("w-full focus-visible:ring-pink-500", errorStyles)}
          required
        />

        <SubmitButton
          text="Create Summary"
          loadingText="Creating Summary"
          loading={loading}
        />
      </form>
    </div>
  );
}
