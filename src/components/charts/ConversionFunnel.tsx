import { funnel } from '../../data/mockData';

const numberFormatter = new Intl.NumberFormat('en-US');

export function ConversionFunnel() {
  return (
    <section className="glass-panel rounded-3xl p-5">
      <div>
        <h2 className="text-lg font-bold text-slate-950 dark:text-white">Conversion funnel</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Track drop-off from visitor to repeat purchase.</p>
      </div>

      <div className="mt-6 space-y-5">
        {funnel.map((item, index) => (
          <div key={item.stage}>
            <div className="mb-2 flex items-center justify-between gap-4 text-sm">
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {index + 1}. {item.stage}
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                {numberFormatter.format(item.value)} · {item.rate}%
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-500 via-cyan-400 to-emerald-400"
                style={{ width: `${item.rate}%` }}
                aria-label={`${item.stage}: ${item.rate}%`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
