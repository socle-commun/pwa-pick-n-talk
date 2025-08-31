import { Box, Grid } from "@mui/material";

import { type Pictogram } from "@/db/models";

import PictogramCard from "./PictogramCard";

export interface PictogramsGridLayoutProps {
  pictograms: Pictogram[];
}

export function PictogramsGridLayout({ pictograms }: PictogramsGridLayoutProps) {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {pictograms.map((pictogram: Pictogram) => (
          <Grid
            key={pictogram.id}
            size={{
              xs: 6,
              sm: 4,
              md: 3,
              lg: 2.4,
              xl: 2,
            }}
          >
            <PictogramCard pictogram={pictogram} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
