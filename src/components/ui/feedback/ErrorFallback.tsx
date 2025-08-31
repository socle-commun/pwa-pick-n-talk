import { Box, Typography } from "@mui/material";

export interface ErrorFallbackProps {
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

export function ErrorFallback({
  title,
  description,
  action
}: ErrorFallbackProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 4
      }}
    >
      <Typography
        variant="h6"
        color="error"
        sx={{ mb: 1, textAlign: "center" }}
      >
        ⚠️ {title}
      </Typography>
      {description && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", mb: 2 }}
        >
          {description}
        </Typography>
      )}
      {action && (
        <Box sx={{ mt: 2 }}>
          {action}
        </Box>
      )}
    </Box>
  );
}
