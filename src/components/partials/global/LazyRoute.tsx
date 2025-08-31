import { Suspense, type ComponentType } from "react";

interface LazyRouteProps {
  component: ComponentType;
}

/**
 * Wrapper component for lazy-loaded routes with loading fallback
 */
function LazyRoute({ component: Component }: LazyRouteProps) {
  return (
    <Suspense fallback={<div >
      <div ></div>
    </div>}>
      <Component />
    </Suspense>
  );
}

export default LazyRoute;
