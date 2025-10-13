import Link from 'next/link';
import { PropsWithChildren } from 'react';

import {
  Sidebar,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar';

const sideBarStyle = {
  '--sidebar-width': 'calc(var(--spacing) * 72)',
  '--header-height': 'calc(var(--spacing) * 12)',
} as React.CSSProperties;

export default function PagesLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider style={sideBarStyle}>
      <Sidebar collapsible="offcanvas" variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
                <Link href="/dashboard">
                  <span className="text-base font-semibold">Cultura Musical</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
      </Sidebar>

      <SidebarInset>
        <div className="flex flex-1 flex-col gap-2 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
