export default function ThreeDotsLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`flex space-x-1 ${className}`}>
      <div className="h-2 w-2 rounded-full bg-primary-600 animate-[bounce_1s_infinite_100ms]"></div>
      <div className="h-2 w-2 rounded-full bg-primary-600 animate-[bounce_1s_infinite_200ms]"></div>
      <div className="h-2 w-2 rounded-full bg-primary-600 animate-[bounce_1s_infinite_300ms]"></div>
    </div>
  );
} 