'use client';

import { CircleAlert } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/contexts/auth-context';
import { usePostLogin } from '@/models/auth';

const formSchema = z.object({
  email: z.email('Informe um email válido'),
  password: z.string().trim().min(1, 'Informe sua senha'),
});

type FormLogin = z.infer<typeof formSchema>;

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { login } = useAuth();

  const { control, handleSubmit } = useForm<FormLogin>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  });

  const { isPending, isError, error, mutateAsync } = usePostLogin();

  const onSubmit: SubmitHandler<FormLogin> = async (data) => {
    try {
      const { user } = await mutateAsync(data);
      login(user);

      const from = searchParams.get('from');

      if (from) {
        router.replace(from);
      } else {
        router.replace('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Cultura Musical</CardTitle>
        <CardDescription>Sistema de gestão de alunos</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="form-login" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">E-mail</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    placeholder="cuca@vai.te.pegar"
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="********"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {isError && (
              <Alert variant="destructive" className="border-red-400 animate__animated animate__headShake">
                <CircleAlert />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>{error?.message}</AlertDescription>
              </Alert>
            )}
          </div>
        </form>
      </CardContent>

      <CardFooter>
        <Field>
          <Button type="submit" form="form-login" className="w-full min-h-8" disabled={isPending}>
            {isPending ? <Spinner /> : 'Entrar'}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
