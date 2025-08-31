import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function EmptyBindersList({
  className,
  ...props
}: {
  className?: string;
}) {
  const { t } = useTranslation();

  return (
    <Box
      {...props}
      className={className}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: 2,
        bgcolor: "background.paper",
        color: "text.secondary",
        borderRadius: 1,
        border: 1,
        borderColor: "divider"
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {t("binders.list.empty")}
      </Typography>
    </Box>
  );
}
