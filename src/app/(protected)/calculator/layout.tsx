// src/app/(protected)/calculator/layout.tsx
import { ReactNode } from 'react';
import CalculatorLayoutClient from './CalculatorLayoutClient';

// Remove dynamic = 'force-dynamic' - not allowed with static export

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  // No server-side auth - all auth happens on client
  return <CalculatorLayoutClient>{children}</CalculatorLayoutClient>;
}
