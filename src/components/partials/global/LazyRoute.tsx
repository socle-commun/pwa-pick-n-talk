import { Suspense, type ComponentType } from "react";

interface LazyRouteProps {
  component: ComponentType;
}

/**
 * Wrapper component for lazy-loaded routes with loading fallback
 */
function LazyRoute({ component: Component }: LazyRouteProps) {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>}>
      <Component />
    </Suspense>
  );
}

export default LazyRoute;
