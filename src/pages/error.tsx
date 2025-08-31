import { Button, Box, Typography } from "@mui/material";

export default function ErrorPage() {
  return (
    <>
            <Box
        component="main"
        sx={{
          display: "grid",
          placeItems: "center",
          px: { xs: 3, lg: 4 },
          py: { xs: 12, sm: 16 },
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h3" sx={{ fontWeight: "semibold" }}>
            404
          </Typography>
          <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
            Page not found
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Sorry, we couldn't find the page you're looking for.
          </Typography>
          <Box
            sx={{
              mt: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
            }}
          >
            <Button href="/" variant="contained" color="primary">
              Go back home
            </Button>
            <Button href="/support" variant="text" sx={{ fontSize: "sm", fontWeight: "semibold" }}>
              Contact support <span aria-hidden="true">&rarr;</span>
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
