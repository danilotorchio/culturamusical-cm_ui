import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item';
import { Separator } from '@/components/ui/separator';

import EnrollmentForm from './components/EnrollmentForm';
import { EnrollmentList } from './components/EnrollmentList';

export default async function EnrollmentsPage() {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <Item className="p-2">
        <ItemContent>
          <ItemTitle className="text-xl">Matrículas</ItemTitle>
          <ItemDescription>Listagem de matrículas</ItemDescription>
        </ItemContent>

        <ItemActions>
          <EnrollmentForm />
        </ItemActions>
      </Item>

      <Separator />

      <EnrollmentList />
    </div>
  );
}
