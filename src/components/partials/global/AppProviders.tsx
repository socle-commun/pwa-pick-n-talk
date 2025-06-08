import { type ReactNode } from "react";

import { Provider as JotaiProvider } from "jotai";

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <JotaiProvider>
      {children}
    </JotaiProvider>
  )
}