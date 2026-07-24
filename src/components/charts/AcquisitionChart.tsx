import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { acquisitionChannels } from '../../data/mockData';

const compactFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1
});

type AcquisitionTooltipProps = {
  active?: boolean;
  payload?: Array<{ value?: number; payload?: { channel: string; revenue: number; conversion: number } }>;
};

function AcquisitionTooltip({ active, payload }: AcquisitionTooltipProps) {
  if (!active || !payload?.length) return null;
  const source = payload[0].payload;
  if (!source) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl dark:border-slate-800 dark:bg-slate-900/95">
      <p className="text-sm font-bold text-slate-950 dark:text-white">{source.channel}</p>
      <div className="mt-2 space-y-1 text-sm text-slate-500 dark:text-slate-400">
        <p>Users: {compactFormatter.format(Number(payload[0].value ?? 0))}</p>
        <p>Revenue: ${compactFormatter.format(source.revenue)}</p>
        <p>Conversion: {source.conversion}%</p>
      </div>
    </div>
  );
}

export function AcquisitionChart() {
  return (
    <section className="glass-panel rounded-3xl p-5 lg:col-span-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-950 dark:text-white">Acquisition by channel</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Compare user volume, conversion quality, and channel-level performance.
          </p>
        </div>
        <span className="rounded-2xl bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Referral CVR 9.4%
        </span>
      </div>

      <div className="mt-6 h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={acquisitionChannels} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="channel" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickFormatter={(value: number) => compactFormatter.format(value)}
              width={52}
            />
            <Tooltip content={<AcquisitionTooltip />} />
            <Bar dataKey="users" name="Users" fill="#6366f1" radius={[12, 12, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
