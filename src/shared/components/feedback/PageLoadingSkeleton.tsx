import { cn } from '@/lib/utils';

type PageLoadingSkeletonProps = {
  page: 'dashboard' | 'transactions';
};

function SkeletonBlock({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn('rounded-md bg-muted/80', className)}
    />
  );
}

export function PageLoadingSkeleton({ page }: PageLoadingSkeletonProps) {
  const isDashboard = page === 'dashboard';

  return (
    <div
      className="mx-auto grid max-w-7xl animate-pulse gap-6"
      role="status"
      aria-busy="true"
      aria-label={`${isDashboard ? '대시보드' : '거래조회'} 페이지 불러오는 중`}
    >
      <header className="flex items-center justify-between gap-4">
        <SkeletonBlock className="h-9 w-28" />
        <span className="sr-only">
          {isDashboard ? '대시보드' : '거래조회'} 페이지를 불러오고 있습니다.
        </span>
      </header>

      <section className="rounded-lg border border-border bg-card p-4 shadow-sm">
        <div className="flex gap-2">
          <SkeletonBlock className="h-8 w-20" />
          <SkeletonBlock className="h-8 w-20" />
          <SkeletonBlock className="h-8 w-20" />
          <SkeletonBlock className="h-8 w-20" />
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_5rem]">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="grid gap-2" key={index}>
              <SkeletonBlock className="h-3 w-14" />
              <SkeletonBlock className="h-9 w-full" />
            </div>
          ))}
          <SkeletonBlock className="h-9 w-full self-end sm:col-span-2 lg:col-span-1" />
        </div>

        {!isDashboard ? (
          <div className="mt-4 border-t border-border pt-4">
            <SkeletonBlock className="h-5 w-28" />
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonBlock className="h-9 w-full" key={index} />
              ))}
            </div>
          </div>
        ) : null}
      </section>

      {isDashboard ? <DashboardResultSkeleton /> : <TableSkeleton />}
    </div>
  );
}

function DashboardResultSkeleton() {
  return (
    <section className="grid gap-4">
      <div className="flex items-center justify-between gap-4">
        <SkeletonBlock className="h-7 w-36" />
        <div className="flex gap-2">
          <SkeletonBlock className="h-6 w-20 rounded-full" />
          <SkeletonBlock className="h-6 w-24 rounded-full" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            className="grid h-28 gap-3 rounded-lg border border-border bg-card p-4 shadow-sm"
            key={index}
          >
            <SkeletonBlock className="h-4 w-20" />
            <SkeletonBlock className="h-7 w-28" />
          </div>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <div className="h-72 rounded-lg border border-border bg-card p-4 shadow-sm">
          <SkeletonBlock className="h-5 w-32" />
          <div className="mt-6 grid gap-5">
            {['w-full', 'w-11/12', 'w-4/5', 'w-3/4', 'w-2/3'].map((width) => (
              <SkeletonBlock
                className={cn('h-3', width)}
                key={width}
              />
            ))}
          </div>
        </div>
        <TableSkeleton />
      </div>
    </section>
  );
}

function TableSkeleton() {
  return (
    <section className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border p-4">
        <SkeletonBlock className="h-5 w-32" />
        <SkeletonBlock className="h-5 w-20" />
      </div>
      <div className="grid gap-3 p-4">
        <SkeletonBlock className="h-9 w-full" />
        {Array.from({ length: 7 }).map((_, index) => (
          <SkeletonBlock className="h-8 w-full" key={index} />
        ))}
      </div>
    </section>
  );
}
