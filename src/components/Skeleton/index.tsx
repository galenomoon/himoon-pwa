interface SkeletonProps {
  conditional: boolean;
  children?: React.ReactNode;
  length?: number;
  className?: string;
}

export default function Skeleton({
  conditional,
  children,
  length = 1,
  className,
}: SkeletonProps) {
  return conditional
    ? children
    : Array(length)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className={`h-fit w-fit animate-[pulse_1230ms_ease-in-out_infinite] rounded-[18px] bg-gray-300 ${className}`}
          >
            <div className="invisible"> {children} </div>
          </div>
        ));
}

export function ProductSkeleton({ length = 1, conditional = false }) {
  if (conditional) return null;
  return Array(length)
    .fill(0)
    .map((_, index) => (
      <section
        key={index}
        className="flex w-[180px] flex-shrink-0 gap-3 relative rounded-2xl flex-col h-[300px]"
      >
        <Skeleton
          className="!h-48 flex-shrink-0 w-full min-w-44 rounded-[18px]"
          conditional={false}
        />
        <div className="flex h-full w-full flex-col items-start justify-between text-start">
          <article className="flex w-full h-full justify-between flex-col">
            <div className="flex flex-col gap-2">
              <Skeleton conditional={false} className="!w-[100px] !h-[18px]" />
              <Skeleton conditional={false} className="!w-[86px] !h-[28px]" />
            </div>
            <Skeleton
              conditional={false}
              className="w-[38px] h-[30px] absolute bottom-3 right-0"
            />
          </article>
        </div>
      </section>
    ));
}
