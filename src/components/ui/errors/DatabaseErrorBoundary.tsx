import { Component, type ReactNode } from "react";
import cn from "@/utils/cn";
import Button from "@/components/ui/actions/Button";

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

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Database Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className={cn("flex flex-col items-center justify-center p-8")}>
            <div className={cn("text-red-600 dark:text-red-400 text-xl mb-2")}>
              ⚠️ Something went wrong
            </div>
            <div className={cn("text-zinc-600 dark:text-zinc-400 text-center")}>
              Failed to load data from the database.
              <br />
              Please try refreshing the page.
            </div>
            <Button
              onClick={() => window.location.reload()}
              color="blue"
              className="mt-4"
            >
              Refresh Page
            </Button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
