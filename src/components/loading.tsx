import { type ClassValue } from 'clsx';

import { cn } from '@/lib/utils';

import { Spinner } from './ui/spinner';

type LoadingProps = {
  className?: ClassValue;
};

export default function Loading({ className }: LoadingProps) {
  return (
    <div className={cn('flex flex-1 items-center justify-center border border-dashed rounded-lg', className)}>
      <Spinner className="size-8" />
    </div>
  );
}
