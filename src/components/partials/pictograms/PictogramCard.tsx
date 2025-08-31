import { SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { Card, CardMedia, Typography, IconButton, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { type Pictogram } from "@/db/models";
import { speak, isSpeechSynthesisSupported } from "@/utils/speak";
import { getTranslation } from "@/utils/translation";

export interface PictogramCardProps {
  pictogram: Pictogram;
  className?: string;
}

export default function PictogramCard({
  pictogram,
  className,
}: PictogramCardProps) {
  const { i18n } = useTranslation();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Extract translated word from properties
  const word = getTranslation(pictogram.properties, i18n.language, "word");

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
    if (!word || isSpeaking) return;

    setIsSpeaking(true);
    try {
      await speak(word, i18n.language);
    } catch (error) {
      console.error("Failed to speak pictogram word:", error);
    } finally {
      setIsSpeaking(false);
    }
  };

  return (
    <Card
      className={className}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
        cursor: "pointer",
        "&:hover": {
          elevation: 4
        }
      }}
    >
      {/* Pictogram Image */}
      <Box sx={{ width: 96, height: 96, mb: 1.5, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {imageUrl ? (
          <CardMedia
            component="img"
            image={imageUrl}
            alt={word}
            sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
          />
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", color: "text.disabled" }}>
            <Typography variant="body2">No Image</Typography>
          </Box>
        )}
      </Box>

      {/* Word Label */}
      <Typography variant="body1" sx={{ textAlign: "center", mb: 1, fontWeight: "medium" }}>
        {word}
      </Typography>

      {/* Speaker Button */}
      {isSpeechSynthesisSupported() && (
        <IconButton
          onClick={handleSpeak}
          disabled={isSpeaking || !word}
          color="primary"
          aria-label={isSpeaking ? "Speaking..." : `Speak "${word}"`}
          size="small"
        >
          <SpeakerWaveIcon style={{ width: 20, height: 20 }} />
        </IconButton>
      )}
    </Card>
  );
}
