"use client";

export default function SkeletonLoader() {
  return (
    <div className="animate-fade-in space-y-4">
      <div className="bg-card-bg border border-border rounded-xl p-6 space-y-4">
        <div className="h-6 w-48 rounded-lg animate-shimmer" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded animate-shimmer" />
          <div className="h-4 w-5/6 rounded animate-shimmer" />
          <div className="h-4 w-4/6 rounded animate-shimmer" />
        </div>
        <div className="h-px bg-border my-4" />
        <div className="h-5 w-40 rounded-lg animate-shimmer" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded animate-shimmer" />
          <div className="h-4 w-3/4 rounded animate-shimmer" />
          <div className="h-4 w-5/6 rounded animate-shimmer" />
          <div className="h-4 w-2/3 rounded animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
