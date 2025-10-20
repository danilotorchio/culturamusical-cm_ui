import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

type CustomComboBoxProps = {
  name: string;
  label: string;
  placeholder: string;
  disabled?: boolean;
  items: { value: string | number; label: string }[];
  defaultValue: string | number | undefined;
};

export default function CustomComboBox({
  name,
  label,
  placeholder,
  disabled = false,
  items,
  defaultValue,
}: CustomComboBoxProps) {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      disabled={disabled}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between">
                {field.value ? items.find((item) => item.value === field.value)?.label : placeholder}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[550px] p-0">
              <Command>
                <CommandInput placeholder="Pesquisar aluno..." className="h-9" />
                <CommandList>
                  <CommandEmpty>Nenhum resultado encontrado</CommandEmpty>
                  <CommandGroup>
                    {items.map((item) => (
                      <CommandItem
                        key={item.value}
                        value={String(item.value)}
                        keywords={[item.label, item.value.toString()]}
                        onSelect={(currentValue: string) => {
                          if (currentValue === String(field.value)) {
                            field.onChange(defaultValue);
                          } else {
                            field.onChange(item.value);
                          }
                          setOpen(false);
                        }}
                      >
                        {item.label}
                        <Check className={cn('ml-auto', field.value === item.value ? 'opacity-100' : 'opacity-0')} />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
