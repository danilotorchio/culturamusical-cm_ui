import { ComponentProps } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

type CustomInputProps = {
  name: string;
  label: string;
  defaultValue: string | number;
} & ComponentProps<'input'>;

export default function CustomInput({ name, label, defaultValue, ...props }: CustomInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <Input {...field} autoComplete="off" aria-invalid={fieldState.invalid} {...props} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
