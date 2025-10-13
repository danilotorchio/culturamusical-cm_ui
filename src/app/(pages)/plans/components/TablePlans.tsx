import { Card, CardContent } from '@/components/ui/card';
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { fetchAPI } from '@/lib/api';
import { PlanModel } from '@/models/plan/types';

const fetchPlans = async () => {
  const response = await fetchAPI<PlanModel[]>('/plans');
  return response.data || [];
};

export async function PlansTable() {
  const data = await fetchPlans();

  if (data.length === 0) {
    return (
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyTitle>Sem dados</EmptyTitle>
          <EmptyDescription>Nenhum plano encontrado</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <Card className="w-full p-0">
      <CardContent className="p-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Plano</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
