import { Box, Grid } from "@mui/material";

import { LoadingSpinner } from "@/components/ui/feedback";
import { type Binder } from "@/db/models";

import { BinderCard, EmptyBindersList } from ".";

interface BindersListProps {
  binders: Binder[] | null | undefined;
}

export function BindersList({ binders }: BindersListProps) {
  if (binders === undefined) {
    return <LoadingSpinner message="Loading binders..." />;
  }

  if (!binders || binders.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          p: 2,
        }}
      >
        <EmptyBindersList />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {binders.map((binder: Binder) => (
          <Grid key={binder.id} size={{ xs: 12, md: 6, lg: 4 }}>
            <BinderCard binder={binder} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
