import { Spinner } from './ui/spinner';

export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center border border-dashed rounded-lg">
      <Spinner className="size-8" />
    </div>
  );
}
