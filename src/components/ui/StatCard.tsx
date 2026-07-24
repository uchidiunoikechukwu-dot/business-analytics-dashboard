import type { LucideIcon } from 'lucide-react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

const toneClasses = {
  indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',
  cyan: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300',
  emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  amber: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
};

type StatCardProps = {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  tone: keyof typeof toneClasses;
};

export function StatCard({ title, value, change, icon: Icon, tone }: StatCardProps) {
  const isPositive = change >= 0;
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <article className="glass-panel rounded-3xl p-5 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">{value}</p>
        </div>
        <div className={`rounded-2xl p-3 ${toneClasses[tone]}`}>
          <Icon aria-hidden="true" className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-5 flex items-center gap-2 text-sm">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-semibold ${
            isPositive
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
              : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
          }`}
        >
          <TrendIcon aria-hidden="true" className="h-4 w-4" />
          {Math.abs(change).toFixed(1)}%
        </span>
        <span className="text-slate-500 dark:text-slate-400">vs previous period</span>
      </div>
    </article>
  );
}
