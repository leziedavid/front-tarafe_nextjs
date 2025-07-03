// app/dashboard/layout.tsx

import DashboardLayout from '@/components/layout2/dashboard-layout';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ReactNode } from 'react';

export default function DashboardRouteLayout({children,}: {children: ReactNode;}) {
  return <DashboardLayout> {children} </DashboardLayout>;
}
