import { TrashIcon, PencilIcon } from "@heroicons/react/20/solid";
import { Card, CardContent, CardActions, Divider, Typography, IconButton } from "@mui/material";
import { type MouseEvent } from "react";
import { useTranslation } from "react-i18next";

import { db } from "@/db";
import { type Binder } from "@/db/models";
import { getTranslation } from "@/utils/translation";

export default function BinderCard({
  binder,
  className,
  ...props
}: {
  binder: Binder;
  className?: string;
}) {
  const { t, i18n } = useTranslation();

  // Extract translated properties
  const title = getTranslation(binder.properties, i18n.language, "title");
  const description = getTranslation(binder.properties, i18n.language, "description");

  return (
    <Card
      {...props}
      className={className}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        cursor: "pointer",
        "&:hover": {
          elevation: 4
        }
      }}
    >
      <CardContent
        component="a"
        href={`/${binder.id}`}
        sx={{
          flex: 1,
          textDecoration: "none",
          color: "inherit",
          "&:hover": {
            textDecoration: "none"
          }
        }}
      >
        <Typography variant="h6" component="h3" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic", mb: 1 }}>
          {t("by")} {binder.author}
        </Typography>
        <Typography variant="body1" color="text.primary">
          {description}
        </Typography>
      </CardContent>

      <Divider />

      <CardActions sx={{ justifyContent: "flex-end", p: 1 }}>
        <IconButton
          component="a"
          href={`${binder.id}/edit`}
          color="primary"
          size="small"
          aria-label={t("edit")}
        >
          <PencilIcon style={{ width: 16, height: 16 }} />
        </IconButton>
        <IconButton
          color="error"
          size="small"
          aria-label={t("delete")}
          onClick={(event: MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            db.deleteBinder(binder.id);
          }}
        >
          <TrashIcon style={{ width: 16, height: 16 }} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
