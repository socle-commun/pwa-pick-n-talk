import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";

import { Button } from "@/components/ui/actions";
import { type TranslatedPictogram } from "@/db/models/TranslatedPictogram";
import { speak, isSpeechSynthesisSupported } from "@/utils/speak";
import cn from "@/utils/cn";

export interface PictogramCardProps {
  pictogram: TranslatedPictogram;
  className?: string;
}

export default function PictogramCard({
  pictogram,
  className,
}: PictogramCardProps) {
  const { i18n } = useTranslation();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Convert blob to URL for image display
  useEffect(() => {
    if (pictogram.image && !imageUrl) {
      const url = URL.createObjectURL(pictogram.image);
      setImageUrl(url);

      // Cleanup function to revoke URL
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [pictogram.image, imageUrl]);

  const handleSpeak = async () => {
    if (!pictogram.word || isSpeaking) return;

    setIsSpeaking(true);
    try {
      await speak(pictogram.word, i18n.language);
    } catch (error) {
      console.error("Failed to speak pictogram word:", error);
    } finally {
      setIsSpeaking(false);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-md hover:shadow-lg transition-shadow",
        "border border-zinc-200 dark:border-zinc-700",
        className
      )}
    >
      {/* Pictogram Image */}
      <div className={cn("w-24 h-24 mb-3 flex items-center justify-center")}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={pictogram.word}
            className={cn("max-w-full max-h-full object-contain")}
          />
        ) : (
          <div
            className={cn(
              "w-full h-full bg-zinc-100 dark:bg-zinc-700 rounded-md",
              "flex items-center justify-center text-zinc-400"
            )}
          >
            No Image
          </div>
        )}
      </div>

      {/* Word Label */}
      <div
        className={cn(
          "text-lg font-medium text-center mb-2 text-zinc-900 dark:text-zinc-100"
        )}
      >
        {pictogram.word}
      </div>

      {/* Speaker Button */}
      {isSpeechSynthesisSupported() && (
        <Button
          onClick={handleSpeak}
          disabled={isSpeaking || !pictogram.word}
          className={cn(
            "p-2 rounded-full",
            "hover:scale-105 active:scale-95 transition-transform duration-150",
            isSpeaking ? "opacity-50 cursor-not-allowed" : ""
          )}
          color="blue"
        >
          <SpeakerWaveIcon className={cn("size-5")} />
          <span className={cn("sr-only")}>
            {isSpeaking ? "Speaking..." : `Speak "${pictogram.word}"`}
          </span>
        </Button>
      )}
    </div>
  );
}
