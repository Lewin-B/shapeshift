import { Suspense } from "react";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </main>
  );
}
