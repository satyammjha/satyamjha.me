export default function Skeleton({ 
    height = 100, 
    className = "" 
  }: { 
    height?: number;
    className?: string;
  }) {
    return (
      <div
        className={`animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700 w-full ${className}`}
        style={{ height }}
      />
    );
  }