'use client';

import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import CustomComboBox from '@/components/custom/CustomComboBox';
import CustomInput from '@/components/custom/CustomInput';
import { DatePicker } from '@/components/custom/DatePicker';
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
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePostEnrollment } from '@/models/enrollment';
import { usePeopleQuery } from '@/models/person';
import { usePlansQuery } from '@/models/plan';
import { EntityStatus } from '@/models/types';

const createFormSchema = (isNewStudent: boolean) =>
  z.object({
    personId: isNewStudent ? z.number().optional() : z.number().min(1, 'Selecione o aluno'),
    planId: z.number().min(1, 'Selecione o plano'),
    beginDate: z.date({ message: 'Selecione a data de início' }),

    name: isNewStudent ? z.string().trim().min(1, 'Informe o nome do aluno') : z.string().optional(),
    email: isNewStudent
      ? z.string().trim().min(1, 'Informe o e-mail').email({ message: 'Informe um e-mail válido' })
      : z.string().optional(),
    phone: isNewStudent ? z.string().trim().min(1, 'Informe o telefone') : z.string().optional(),
    birthDate: isNewStudent ? z.date({ message: 'Selecione a data de nascimento' }) : z.date().optional(),
  });

type FormEnrollment = z.infer<ReturnType<typeof createFormSchema>>;

export default function EnrollmentForm() {
  const [open, setOpen] = useState(false);
  const [isNewStudent, setIsNewStudent] = useState(false);

  const methods = useForm<FormEnrollment>({
    defaultValues: {
      beginDate: new Date(),
    },
    resolver: zodResolver(createFormSchema(isNewStudent)),
  });

  const { data: dataPeople, isPending: isPendingPeople, isError: isErrorPeople } = usePeopleQuery();
  const { data: dataPlans, isPending: isPendingPlans, isError: isErrorPlans } = usePlansQuery();

  const { isPending: isPendingEnrollment, mutateAsync } = usePostEnrollment();

  useEffect(() => {
    methods.clearErrors();
    Object.keys(methods.formState.errors).forEach((key) => {
      methods.trigger(key as keyof FormEnrollment);
    });
  }, [isNewStudent, methods]);

  const handleTabChange = (value: string) => {
    const newIsNewStudent = value === 'new';
    setIsNewStudent(newIsNewStudent);

    const planId = methods.getValues('planId');
    const beginDate = methods.getValues('beginDate');

    methods.reset({ planId, beginDate });
  };

  const onSubmit: SubmitHandler<FormEnrollment> = async (data) => {
    try {
      await mutateAsync(data);

      setOpen(false);
      setIsNewStudent(false);

      methods.reset();
    } catch (error) {
      console.error('Enrollment creation error:', error);
    }
  };

  if (isPendingPeople || isPendingPlans || isErrorPeople || isErrorPlans) {
    return (
      <Button variant="outline" disabled={true}>
        Nova matrícula
      </Button>
    );
  }

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={isPendingPeople || isErrorPeople}>
          Nova matrícula
        </Button>
      </DialogTrigger>

      <DialogContent className="md:max-w-[600px]" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Nova matrícula</DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <form id="form-enrollment" onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
              <Tabs defaultValue="existing" className="w-full" onValueChange={handleTabChange}>
                <TabsList className="w-full mb-2">
                  <TabsTrigger value="existing">Aluno existente</TabsTrigger>
                  <TabsTrigger value="new">Novo aluno</TabsTrigger>
                </TabsList>

                <TabsContent value="existing" className="animate__animated animate__fadeIn animate__faster">
                  <CustomComboBox
                    name="personId"
                    label="Aluno:"
                    placeholder="Selecione o aluno"
                    items={dataPeople.map((p) => ({ value: p.id, label: p.name }))}
                    disabled={isPendingPeople || dataPeople.length === 0}
                    defaultValue={0}
                  />
                </TabsContent>

                <TabsContent value="new" className="animate__animated animate__fadeIn animate__faster">
                  <div className="flex flex-col gap-4">
                    <CustomInput name="name" label="Nome:" defaultValue="" placeholder="Nome do aluno" />
                    <CustomInput name="email" label="E-mail:" defaultValue="" placeholder="E-mail do aluno" />

                    <div className="grid grid-cols-2 gap-4">
                      <CustomInput
                        name="phone"
                        label="Telefone:"
                        defaultValue=""
                        placeholder="Telefone do aluno"
                        type="tel"
                      />

                      <DatePicker name="birthDate" label="Data de Nascimento:" />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="grid grid-cols-2 gap-4">
                <CustomComboBox
                  name="planId"
                  label="Plano:"
                  placeholder="Selecione o plano"
                  items={dataPlans
                    .filter((p) => p.status === EntityStatus.ACTIVE)
                    .map((p) => ({ value: p.id, label: p.name }))}
                  disabled={isPendingPlans || dataPlans.length === 0}
                  defaultValue={0}
                />

                <DatePicker name="beginDate" label="Data de Início:" />
              </div>
            </div>
          </form>
        </FormProvider>

        <Separator className="my-2" />

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={isPendingEnrollment}>
              Cancelar
            </Button>
          </DialogClose>

          <Button type="submit" form="form-enrollment">
            {isPendingEnrollment ? <Spinner /> : 'Salvar alterações'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
