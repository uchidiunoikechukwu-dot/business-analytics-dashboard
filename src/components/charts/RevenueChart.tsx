import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { revenueTrend } from '../../data/mockData';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
});

type TooltipPayload = {
  color?: string;
  name?: string;
  value?: number;
};

type ChartTooltipProps = {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
};

function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
      <p className="mb-2 text-sm font-bold text-slate-950 dark:text-white">{label}</p>
      <div className="space-y-1">
        {payload.map((item) => (
          <div key={item.name} className="flex items-center justify-between gap-6 text-sm">
            <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              {item.name}
            </span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {currencyFormatter.format(Number(item.value ?? 0))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RevenueChart() {
  return (
    <section className="glass-panel rounded-3xl p-5 lg:col-span-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-950 dark:text-white">Revenue and profit trend</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Monthly recurring revenue, profit contribution, and seasonal demand.
          </p>
        </div>
        <div className="rounded-2xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          +31.9% YoY growth
        </div>
      </div>

      <div className="mt-6 h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueTrend} margin={{ top: 10, right: 8, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.32} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="profit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.28} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" vertical={false} />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickFormatter={(value: number) => `$${Math.round(value / 1000)}k`}
              width={64}
            />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="#6366f1"
              strokeWidth={3}
              fill="url(#revenue)"
              activeDot={{ r: 6, strokeWidth: 3, stroke: '#ffffff' }}
            />
            <Area
              type="monotone"
              dataKey="profit"
              name="Profit"
              stroke="#22d3ee"
              strokeWidth={3}
              fill="url(#profit)"
              activeDot={{ r: 6, strokeWidth: 3, stroke: '#ffffff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
