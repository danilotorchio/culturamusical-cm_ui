'use client';

import { CalendarCheck, ChartNoAxesCombined, EllipsisVertical, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useAuth } from '@/contexts/auth-context';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';

export default function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const { user } = useAuth();

  return (
    <Sidebar collapsible="offcanvas" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Link href="/">
                <span className="text-base font-semibold">Cultura Musical</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="cursor-pointer"
                  tooltip="Matrículas"
                  isActive={pathname === '/enrollments'}
                  onClick={() => router.push('/enrollments')}
                >
                  <Users />
                  <span>Matrículas</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="cursor-pointer"
                  tooltip="Planos"
                  isActive={pathname === '/plans'}
                  onClick={() => router.push('/plans')}
                >
                  <CalendarCheck />
                  <span>Planos</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg grayscale">
            <AvatarImage src={`https://gravatar.com/avatar/${user?.emailHash}`} alt={user?.name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user?.name}</span>
            <span className="text-muted-foreground truncate text-xs">{user?.email}</span>
          </div>
          <EllipsisVertical className="ml-auto size-4" />
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
