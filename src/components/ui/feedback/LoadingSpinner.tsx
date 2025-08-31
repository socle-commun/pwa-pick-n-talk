import { Box, CircularProgress, Typography } from "@mui/material";

export interface LoadingSpinnerProps {
  message?: string;
  size?: "small" | "medium" | "large";
}

export function LoadingSpinner({
  message = "Loading...",
  size = "medium"
}: LoadingSpinnerProps) {
  const sizeMap = {
    small: 24,
    medium: 40,
    large: 56
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
        flexDirection: "column",
        gap: 2
      }}
    >
      <CircularProgress
        size={sizeMap[size]}
        color="primary"
      />
      <Typography
        variant="body2"
        color="text.secondary"
      >
        {message}
      </Typography>
    </Box>
  );
}
