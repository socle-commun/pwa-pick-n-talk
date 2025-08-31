
import { Paper, Typography } from "@mui/material";

interface BinderHeaderProps {
  title: string;
  description?: string;
}

export function BinderHeader({ title, description }: BinderHeaderProps) {
  return (
    <Paper
      sx={{
        borderRadius: 0,
        borderBottom: 1,
        borderColor: "divider",
        p: 3
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        {title}
      </Typography>
      {description && (
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      )}
    </Paper>
  );
}
