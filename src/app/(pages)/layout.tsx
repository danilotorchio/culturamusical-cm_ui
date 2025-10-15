import { PropsWithChildren } from 'react';

import { Separator } from '@radix-ui/react-separator';

import AppBreadcrumb from '@/components/layout/app-breadcrumb';
import AppSidebar from '@/components/layout/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

const sideBarStyle = {
  '--sidebar-width': 'calc(var(--spacing) * 72)',
  '--header-height': 'calc(var(--spacing) * 12)',
} as React.CSSProperties;

export default function PagesLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider style={sideBarStyle}>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
          <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" />
            <AppBreadcrumb />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-2 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
