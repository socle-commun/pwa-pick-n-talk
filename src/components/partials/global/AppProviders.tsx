import { Provider as JotaiProvider } from "jotai";
import { type ReactNode } from "react";


interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return <JotaiProvider>{children}</JotaiProvider>;
}
