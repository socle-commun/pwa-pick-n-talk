import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function EmptyBindersList({
  ...props
}: object) {
  const { t } = useTranslation();

  return (
    <Box
      {...props}
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
