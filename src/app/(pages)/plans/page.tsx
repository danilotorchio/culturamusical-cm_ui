import { Suspense } from 'react';

import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item';
import { Separator } from '@/components/ui/separator';

import { PlansTable } from './components/TablePlans';



export default async function PlansPage() {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <Item className="p-2">
        <ItemContent>
          <ItemTitle className="text-xl">Planos</ItemTitle>
          <ItemDescription>Cadastro de planos</ItemDescription>
        </ItemContent>

        <ItemActions>
          <Button variant="outline" size="sm" disabled>
            Adicionar novo
          </Button>
        </ItemActions>
      </Item>

      <Separator />

      <Suspense fallback={<Loading />}>
        <PlansTable />
      </Suspense>
    </div>
  );
}
