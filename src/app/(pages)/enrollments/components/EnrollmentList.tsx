'use client';

import Error from '@/components/error';
import Loading from '@/components/loading';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { useEnrollmentsQuery } from '@/models/enrollment';
import { EntityStatus, EntityStatusDescription } from '@/models/types';

import { EnrollmentRenew } from './EnrollmentRenew';

export function EnrollmentList() {
  const { data, isPending, isError, error, refetch } = useEnrollmentsQuery();

  const formatDate = (date: Date | string | undefined) => {
    if (date === undefined) return '-';
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
  };

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <Error message={error.message} onRefresh={() => refetch()} />;
  }

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
              <TableHead className="text-center">Data de Início</TableHead>
              <TableHead className="text-center">Data de Término</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.enrollmentId}</TableCell>
                <TableCell>{item.personName}</TableCell>
                <TableCell>{item.planName}</TableCell>
                <TableCell align="center">{formatDate(item.beginDate)}</TableCell>
                <TableCell align="center">{formatDate(item.endDate)}</TableCell>
                <TableCell align="center">
                  <Badge
                    className={cn('bg-green-700', {
                      'bg-yellow-700': item.status === EntityStatus.INACTIVE,
                      'bg-red-700': item.status === EntityStatus.EXPIRED,
                    })}
                  >
                    {EntityStatusDescription[item.status as EntityStatus]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <EnrollmentRenew enrollmentId={item.enrollmentId} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
