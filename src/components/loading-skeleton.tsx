import { Skeleton } from "./ui/skeleton";

const WeatherSkeleton = () => {
  return (
    <div className="space-y-6">
      <Skeleton className="h-7 w-64 rounded-lg" />
      <div className="flex items-center gap-4">
        <Skeleton className="h-24 w-1/4 lg:w-64 rounded-lg" />
        <Skeleton className="h-24 w-1/4 lg:w-64 rounded-lg" />
        <Skeleton className="h-24 w-1/4 lg:w-64 rounded-lg" />
        <Skeleton className="h-24 w-1/4 lg:w-64 rounded-lg" />
        <Skeleton className="h-24 w-1/4 lg:w-64 rounded-lg" />
        <Skeleton className="h-24 w-1/4 lg:w-64 rounded-lg" />
      </div>
      <Skeleton className="h-7 w-64 rounded-lg" />
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <Skeleton className="h-72 md:w-4/12 rounded-lg" />
          <Skeleton className="h-72 w-full flex-1 rounded-lg" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-72 w-full rounded-lg" />
          <Skeleton className="h-[560px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default WeatherSkeleton;
