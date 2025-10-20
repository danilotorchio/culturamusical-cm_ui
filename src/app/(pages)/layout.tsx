import { PropsWithChildren } from 'react';

import AppLayout from '@/components/layout/AppLayout';

export default function PagesLayout({ children }: PropsWithChildren) {
  return <AppLayout>{children}</AppLayout>;
}
