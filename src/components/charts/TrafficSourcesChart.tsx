import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { sourceShare } from '../../data/mockData';

type SourceTooltipProps = {
  active?: boolean;
  payload?: Array<{
    name?: string;
    value?: number;
    payload?: { color?: string };
  }>;
};

function SourceTooltip({ active, payload }: SourceTooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 shadow-xl dark:border-slate-800 dark:bg-slate-900/95">
      <p className="text-sm font-bold text-slate-950 dark:text-white">{item.name}</p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.value}% of acquisition</p>
    </div>
  );
}

export function TrafficSourcesChart() {
  return (
    <section className="glass-panel rounded-3xl p-5">
      <div>
        <h2 className="text-lg font-bold text-slate-950 dark:text-white">Traffic sources</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Channel contribution to total customer acquisition.</p>
      </div>

      <div className="mt-4 h-56 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={sourceShare}
              dataKey="value"
              nameKey="name"
              innerRadius="58%"
              outerRadius="82%"
              paddingAngle={5}
              stroke="none"
            >
              {sourceShare.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<SourceTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 space-y-3">
        {sourceShare.map((item) => (
          <div key={item.name} className="flex items-center justify-between gap-4 text-sm">
            <span className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              {item.name}
            </span>
            <span className="font-bold text-slate-950 dark:text-white">{item.value}%</span>
          </div>
        ))}
      </div>
    </section>
  );
}
