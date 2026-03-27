// src/app/(protected)/layout.tsx
import { ReactNode } from 'react';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  // This layout just provides the protected route group wrapper
  // The actual auth check is in the calculator layout
  return <>{children}</>;
}
