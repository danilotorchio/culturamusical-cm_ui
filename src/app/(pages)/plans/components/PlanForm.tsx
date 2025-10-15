'use client';

import { CircleAlert, Edit } from 'lucide-react';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { PlanModel, PlanPeriod, PlanStatus, usePostPlan, useUpdatePlan } from '@/models/plan';

const formSchema = z.object({
  name: z.string().trim().min(1, 'Informe o nome do plano'),
  period: z.enum(PlanPeriod, { error: 'Informe o período do plano' }),
  status: z.enum(PlanStatus, { error: 'Informe o status do plano' }),
  value: z.any(),
});

type FormPlan = z.infer<typeof formSchema>;

type PlansFormProps = {
  plan?: PlanModel;
};

export function PlanForm({ plan }: PlansFormProps) {
  const [open, setOpen] = useState(false);

  const { control, handleSubmit } = useForm<FormPlan>({
    defaultValues: {
      name: plan?.name ?? '',
      period: plan?.period ?? PlanPeriod.MONTHLY,
      status: plan?.status ?? PlanStatus.ACTIVE,
      value: plan?.value ?? 0,
    },
    resolver: zodResolver(formSchema),
  });

  const {
    isPending: isPendingPostPlan,
    isError: isErrorPostPlan,
    error: errorPostPlan,
    mutateAsync: mutateAsyncPostPlan,
  } = usePostPlan();

  const {
    isPending: isPendingUpdatePlan,
    isError: isErrorUpdatePlan,
    error: errorUpdatePlan,
    mutateAsync: mutateAsyncUpdatePlan,
  } = useUpdatePlan();

  const onSubmit: SubmitHandler<FormPlan> = async (data) => {
    try {
      if (plan && plan.id) {
        await mutateAsyncUpdatePlan({ id: plan.id, ...data });
      } else {
        await mutateAsyncPostPlan(data);
      }

      setOpen(false);
    } catch (error) {
      console.error('Plan creation error:', error);
    }
  };

  return (
    <Dialog modal={true} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {plan === undefined ? (
          <Button variant="outline">Novo plano</Button>
        ) : (
          <Button variant="ghost" size="sm" className="cursor-pointer">
            <Edit />
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Adicionar plano</DialogTitle>
        </DialogHeader>

        <form id="form-plan" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            <Controller
              name="name"
              control={control}
              defaultValue={plan?.name}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Nome:</FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    placeholder="Informe um nome para o plano"
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="period"
              control={control}
              defaultValue={plan?.period || PlanPeriod.MONTHLY}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="period">Período:</FieldLabel>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Períodos</SelectLabel>
                        <SelectItem value={PlanPeriod.MONTHLY}>Mensal</SelectItem>
                        <SelectItem value={PlanPeriod.QUARTERLY}>Trimestral</SelectItem>
                        <SelectItem value={PlanPeriod.BIANNUAL}>Semestral</SelectItem>
                        <SelectItem value={PlanPeriod.YEARLY}>Anual</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            {plan && (
              <Controller
                name="value"
                control={control}
                defaultValue={plan?.value || 0}
                disabled={true}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="value">Valor:</FieldLabel>
                    <Input
                      id="value"
                      placeholder="Informe um valor para o plano"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                      value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(field.value)}
                      disabled={field.disabled}
                    />
                  </Field>
                )}
              />
            )}
            <Controller
              name="status"
              control={control}
              defaultValue={plan?.status || PlanStatus.ACTIVE}
              disabled={plan === undefined}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="status">Status:</FieldLabel>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value={PlanStatus.ACTIVE}>Ativo</SelectItem>
                        <SelectItem value={PlanStatus.INACTIVE}>Inativo</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {(isErrorPostPlan || isErrorUpdatePlan) && (
              <Alert variant="destructive" className="border-red-400 animate__animated animate__headShake">
                <CircleAlert />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>{errorPostPlan?.message || errorUpdatePlan?.message}</AlertDescription>
              </Alert>
            )}
          </div>
        </form>

        <Separator className="my-2" />

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>

          <Button type="submit" form="form-plan" disabled={isPendingPostPlan || isPendingUpdatePlan}>
            {isPendingPostPlan || isPendingUpdatePlan ? <Spinner /> : 'Salvar alterações'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
