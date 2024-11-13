"use client";

import { cn} from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/custom/submit-button";


interface StrapiErrorsProps {
  message: string | null;
  name: string;
}

const INITIAL_STATE = {
  message: null,
  name: "",
};

interface SummaryFormProps {
  error: StrapiErrorsProps;
  value: string;
  setValue: (value: string) => void;
  loading: boolean;
  clearError: () => void;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function SummaryForm({ error, value, setValue, loading, handleFormSubmit, clearError }: SummaryFormProps) {

  const errorStyles = error.message
    ? "outline-1 outline outline-pink-400 placeholder:text-pink-700"
    : "";

  return (
    <div className="w-full max-w-[960px]">
      <form
        onSubmit={handleFormSubmit}
        className="flex gap-2 items-center justify-center"
      >
        <Input
          name="videoId"
          placeholder={
            error.message ? error.message : "Youtube Video ID or URL"
          }
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onMouseDown={clearError}
          className={cn(
            "w-full focus-visible:ring-pink-500",
            errorStyles
          )}
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


