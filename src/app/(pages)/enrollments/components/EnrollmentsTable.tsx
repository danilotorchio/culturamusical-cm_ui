import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { fetchAPI } from '@/lib/api';
import { EnrollmentModel } from '@/models/enrollment/types';

const fetchEnrollments = async () => {
  const response = await fetchAPI<EnrollmentModel[]>('/enrollments');
  return response.data || [];
};

export async function EnrollmentsTable() {
  const data = await fetchEnrollments();

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(dateString));
  };

  if (data.length === 0) {
    return (
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyTitle>Sem dados</EmptyTitle>
          <EmptyDescription>Nenhuma matrícula encontrada</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <Card className="w-full gap-2">
      <CardHeader>
        <CardDescription>{data.length} matrículas encontradas</CardDescription>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Aluno</TableHead>
              <TableHead>Plano</TableHead>
              <TableHead>Data de Início</TableHead>
              <TableHead>Data de Término</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.person?.name}</TableCell>
                <TableCell>{item.plan?.name}</TableCell>
                <TableCell>{formatDate(item.beginDate)}</TableCell>
                <TableCell>{formatDate(item.beginDate)}</TableCell>
                <TableCell>
                  <Badge className="bg-green-700">Ativo</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
