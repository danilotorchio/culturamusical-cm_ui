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
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group';
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
import { PlanModel, PlanPeriod, usePostPlan, useUpdatePlan } from '@/models/plan';
import { EntityStatus } from '@/models/types';

const formSchema = z.object({
  name: z.string().trim().min(1, 'Informe o nome do plano'),
  period: z.enum(PlanPeriod, { error: 'Informe o período do plano' }),
  status: z.enum(EntityStatus, { error: 'Informe o status do plano' }),
  value: z.number(),
});

type FormPlan = z.infer<typeof formSchema>;

type PlansFormProps = {
  plan?: PlanModel;
};

export function PlanForm({ plan }: PlansFormProps) {
  const [open, setOpen] = useState(false);

  const { control, handleSubmit, reset } = useForm<FormPlan>({
    defaultValues: {
      name: plan?.name ?? '',
      period: plan?.period ?? PlanPeriod.MONTHLY,
      status: plan?.status ?? EntityStatus.ACTIVE,
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
        await mutateAsyncPostPlan({ name: data.name, period: data.period });
      }

      setOpen(false);
      reset();
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

      <DialogContent className="md:max-w-[600px]" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Novo plano</DialogTitle>
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

            <Controller
              name="value"
              control={control}
              defaultValue={plan?.value || 0}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="value">Valor:</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <InputGroupText>R$</InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="0,00"
                      value={new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(
                        field.value,
                      )}
                      onKeyDown={(e) => {
                        const allowedKeys = ['Backspace', 'Tab', 'Enter'];
                        if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        const numericValue = parseFloat(e.target.value.replace(/[^\d]/g, ''));
                        if (!isNaN(numericValue)) {
                          field.onChange(numericValue / 100);
                        }
                      }}
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupText>BRL</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
              )}
            />

            <Controller
              name="status"
              control={control}
              defaultValue={plan?.status || EntityStatus.ACTIVE}
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
                        <SelectItem value={EntityStatus.ACTIVE}>Ativo</SelectItem>
                        <SelectItem value={EntityStatus.INACTIVE}>Inativo</SelectItem>
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
            <Button type="button" variant="outline" disabled={isPendingPostPlan || isPendingUpdatePlan}>
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
