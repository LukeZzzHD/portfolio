import { cn } from '@/lib/utils';

export function Section({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn('flex min-h-[calc(100vh-64px)] h-fit w-screen px-10 md:px-40 py-5', className)}
    >
      {children}
    </section>
  );
}
