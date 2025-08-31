import { Box, Typography } from "@mui/material";

export interface EmptyStateProps {
  title: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  icon,
  action
}: EmptyStateProps) {
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
      {icon && (
        <Box sx={{ fontSize: "2.25rem", mb: 2, color: "text.disabled" }}>
          {icon}
        </Box>
      )}
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ mb: 1, textAlign: "center" }}
      >
        {title}
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
