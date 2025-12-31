import { cn } from '../utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GlassCard = ({ children, className, ...props }: GlassCardProps) => {
  return (
    <div 
      className={cn(
        "bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};
