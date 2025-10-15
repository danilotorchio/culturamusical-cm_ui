import { Suspense } from 'react';

import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item';
import { Separator } from '@/components/ui/separator';

import { EnrollmentsStats } from './components/EnrollmentStats';
import { EnrollmentsTable } from './components/EnrollmentsTable';

export default async function EnrollmentsPage() {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <Item className="p-2">
        <ItemContent>
          <ItemTitle className="text-xl">Matrículas</ItemTitle>
          <ItemDescription>Listagem de matrículas</ItemDescription>
        </ItemContent>

        <ItemActions>
          <Button variant="outline" size="sm" disabled>
            Nova matrícula
          </Button>
        </ItemActions>
      </Item>

      <Separator />

      <Suspense fallback={<Loading className="max-h-48" />}>
        <EnrollmentsStats />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <EnrollmentsTable />
      </Suspense>
    </div>
  );
}
