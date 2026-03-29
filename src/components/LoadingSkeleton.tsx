export const LoadingSkeleton = () => {
  return (
    <div className="space-y-8 mt-10 animate-pulse">
      {/* Hero Skeleton */}
      <div className="text-center py-10 space-y-4">
        <div className="w-32 h-32 bg-white/5 rounded-full mx-auto" />
        <div className="w-40 h-24 bg-white/10 rounded-3xl mx-auto" />
        <div className="w-32 h-6 bg-white/5 rounded-full mx-auto" />
      </div>

      {/* Hourly Skeleton */}
      <div className="glass p-6 rounded-[2.5rem] space-y-4">
        <div className="w-24 h-3 bg-white/5 rounded-full" />
        <div className="flex gap-6 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[50px]">
              <div className="w-8 h-3 bg-white/5 rounded-full" />
              <div className="w-10 h-10 bg-white/10 rounded-full" />
              <div className="w-10 h-4 bg-white/5 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Blocks Skeleton */}
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass p-5 rounded-[2.5rem] h-40 space-y-4">
            <div className="w-20 h-3 bg-white/5 rounded-full" />
            <div className="w-24 h-10 bg-white/10 rounded-2xl mt-auto" />
          </div>
        ))}
      </div>
    </div>
  )
}

