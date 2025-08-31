import { Button, Box, Typography } from "@mui/material";
import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary component for handling database query errors
 */
export class DatabaseErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    console.error("Database Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              p: 4 
            }}
          >
            <Typography 
              variant="h5" 
              color="error" 
              sx={{ mb: 1 }}
            >
              ⚠️ Something went wrong
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ textAlign: 'center', mb: 2 }}
            >
              Failed to load data from the database.
              <br />
              Please try refreshing the page.
            </Typography>
            <Button
              onClick={() => window.location.reload()}
              color="primary"
              variant="contained"
            >
              Refresh Page
            </Button>
          </Box>
        )
      );
    }

    return this.props.children;
  }
}
