'use client';

import Error from '@/components/error';
import Loading from '@/components/loading';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlanPeriodDescriptions, usePlansQuery } from '@/models/plan';
import { EntityStatus, EntityStatusDescription } from '@/models/types';

import { PlanForm } from './PlanForm';

export function PlanList() {
  const { data, isPending, isError, error, refetch } = usePlansQuery();

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
          <EmptyDescription>Nenhum plano encontrado</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <Card className="w-full gap-2">
      <CardHeader>
        <CardDescription>{data.length} planos encontrados</CardDescription>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Plano</TableHead>
              <TableHead className="w-[250px] text-right">Valor</TableHead>
              <TableHead className="w-[250px] text-center">Período</TableHead>
              <TableHead className="w-[100px] text-center">Status</TableHead>
              <TableHead className="w-[100px]" align="right"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.value)}
                </TableCell>
                <TableCell align="center">{PlanPeriodDescriptions[item.period]}</TableCell>
                <TableCell align="center">
                  <Badge variant={item.status === EntityStatus.ACTIVE ? 'default' : 'destructive'}>
                    {EntityStatusDescription[item.status]}
                  </Badge>
                </TableCell>
                <TableCell align="right">
                  <PlanForm plan={item} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
