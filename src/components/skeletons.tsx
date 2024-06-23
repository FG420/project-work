import { Skeleton } from './ui/skeleton';

export function CardSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[320px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-10 p-4">
      <Skeleton className="h-[450px] w-full" />
      <Skeleton className="h-[450px] w-full" />
    </div>
  );
}

export function ItemsSkeleton() {
  return (
    <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}

export function SingleItemSkeleton() {
  return (
    <div className="flex mt-7 ml-7">
      <div className="flex gap-10">
        <div>
          <Skeleton className="h-[500px] w-[500px]" />
        </div>

        <div className="flex flex-col gap-3">
          <Skeleton className="h-8 w-[550px]" />
          <Skeleton className="h-8 w-[400px]" />
          <Skeleton className="h-6 w-[350px]" />
          <Skeleton className="h-[5px] w-full mt-5" />

          <div className="flex flex-row gap-5">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-8 w-[150px]" />
            <Skeleton className="h-8 w-[150px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function RowsSkeleton() {
  return (
    <div className="flex flex-col gap-1 p-4">
      <Skeleton className="h-[46px] w-full rounded-xl" />
      <div className="space-y-1">
        <Skeleton className="h-[65px] w-full" />
        <Skeleton className="h-[65px] w-full" />
        <Skeleton className="h-[65px] w-full" />
        <Skeleton className="h-[65px] w-full" />
        <Skeleton className="h-[65px] w-full" />
        <Skeleton className="h-[65px] w-full" />
      </div>
    </div>
  );
}

export function SuppliersPageSkeleton() {
  return (
    <div className="flex flex-col gap-4 mt-2">
      <Skeleton className="h-[36px] w-[115px] rounded-xl self-end mr-4" />
      <div className="flex flex-row gap-3 self-end mr-4">
        <Skeleton className="h-[46px] w-[195px] rounded-xl" />
        <Skeleton className="h-[46px] w-[195px] rounded-xl" />
      </div>
      <RowsSkeleton />
    </div>
  );
}

export function PurchasePageSkeleton() {
  return (
    <div className="flex flex-col gap-4 mt-2">
      <Skeleton className="h-[36px] w-[115px] rounded-xl self-end mr-4" />
      <div className="flex flex-row gap-3 justify-around mr-4">
        <Skeleton className="h-[46px] w-[195px] rounded-xl" />
        <Skeleton className="h-[46px] w-[195px] rounded-xl" />
        <Skeleton className="h-[46px] w-[195px] rounded-xl" />
        <Skeleton className="h-[46px] w-[195px] rounded-xl" />
        <Skeleton className="h-[46px] w-[195px] rounded-xl" />
      </div>
      <RowsSkeleton />
    </div>
  );
}

export function OrdersPageSkeleton() {
  return (
    <div className="flex flex-col gap-4 mt-20">
      <div className="flex flex-row gap-3 justify-between ml-10 mr-10">
        <Skeleton className="h-[46px] w-[195px] rounded-xl" />
        <Skeleton className="h-[46px] w-[195px] rounded-xl" />
      </div>
      <RowsSkeleton />
    </div>
  );
}

export function AnalyticsSkeleton() {
  return (
    <div className="flex flex-col gap-6 px-2 items-center mt-8">
      <Skeleton className="h-[50px] w-[180px] rounded-xl" />
      <div className="flex flex-row gap-8 justify-evenly">
        <Skeleton className="h-[46px] w-[195px] rounded-xl" />
        <Skeleton className="h-[46px] w-[195px] rounded-xl" />
        <Skeleton className="h-[46px] w-[195px] rounded-xl" />
        <Skeleton className="h-[46px] w-[195px] rounded-xl" />
      </div>
      <Skeleton className="h-[46px] w-[135px] rounded-xl" />
      <Skeleton className="h-[450px] w-[900px]" />
    </div>
  );
}
