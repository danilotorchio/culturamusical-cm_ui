import { CircleAlert } from 'lucide-react';

import { Button } from './ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from './ui/empty';

type ErrorProps = {
  message: string;
  onRefresh?: () => void;
};

export default function Error({ message, onRefresh }: ErrorProps) {
  return (
    <div className="flex flex-1 items-center justify-center animate__animated animate__headShake">
      <Empty className="border border-dashed border-red-400 max-w-3xl md:h-80">
        <EmptyHeader>
          <EmptyMedia variant="default">
            <CircleAlert className="text-red-400" />
          </EmptyMedia>
          <EmptyTitle>Falha ao carregar informações</EmptyTitle>
          <EmptyDescription>{message}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="destructive" onClick={onRefresh}>
            Tentar novamente
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
