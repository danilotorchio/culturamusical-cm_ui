import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item';
import { Separator } from '@/components/ui/separator';

import { PlanForm } from './components/PlanForm';
import { PlanList } from './components/PlanList';

export default async function PlansPage() {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <Item className="p-2">
        <ItemContent>
          <ItemTitle className="text-xl">Planos</ItemTitle>
          <ItemDescription>Cadastro de planos</ItemDescription>
        </ItemContent>

        <ItemActions>
          <PlanForm />
        </ItemActions>
      </Item>

      <Separator />
      <PlanList />
    </div>
  );
}
