import { Suspense } from "react";
import { SandpackProvider } from "@codesandbox/sandpack-react";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <SandpackProvider>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </SandpackProvider>
    </main>
  );
}
