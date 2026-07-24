import { useEffect, useMemo, useState } from 'react';
import { AcquisitionChart } from './components/charts/AcquisitionChart';
import { ConversionFunnel } from './components/charts/ConversionFunnel';
import { RevenueChart } from './components/charts/RevenueChart';
import { TrafficSourcesChart } from './components/charts/TrafficSourcesChart';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { TransactionsTable } from './components/tables/TransactionsTable';
import { StatCard } from './components/ui/StatCard';
import { insights, kpiCards, metricsByPeriod, transactions, type Period } from './data/mockData';

const numberFormatter = new Intl.NumberFormat('en-US');
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
});

function formatMetric(value: number, prefix: string, suffix: string) {
  if (prefix === '$') return currencyFormatter.format(value);
  if (suffix === '%') return `${value.toFixed(1)}%`;
  return numberFormatter.format(value);
}

export default function App() {
  const [period, setPeriod] = useState<Period>('30d');
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [toast, setToast] = useState<string | null>(null);

  const showAction = (message: string) => {
    setToast(message);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    if (!toast) return;

    const timeoutId = window.setTimeout(() => {
      setToast(null);
    }, 2600);

    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  const metrics = metricsByPeriod[period];

  const revenuePerCustomer = useMemo(() => metrics.revenue / metrics.customers, [metrics.customers, metrics.revenue]);

  return (
    <div id="top" className="min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      <a
        href="#main-content"
        className="focus-ring sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-slate-950"
      >
        Skip to dashboard content
      </a>

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-brand-400/20 blur-3xl" />
        <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 rounded-full bg-emerald-300/10 blur-3xl" />
      </div>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onAction={showAction} />

      <div className="relative lg:pl-72">
        <Topbar
          isDark={isDark}
          onToggleDark={() => setIsDark((value) => !value)}
          onOpenSidebar={() => setSidebarOpen(true)}
          period={period}
          onPeriodChange={setPeriod}
          search={search}
          onSearchChange={setSearch}
          onAction={showAction}
        />

        <main id="main-content" className="px-4 pb-28 pt-5 sm:px-6 lg:px-8 lg:pb-8 lg:pt-6">
          <section className="mb-6 grid gap-4 xl:grid-cols-[1fr_380px]">
            <div className="glass-panel rounded-3xl p-4 sm:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-300">
                    Client-ready portfolio project
                  </p>
                  <h2 className="mt-3 max-w-3xl text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                    Track revenue, acquisition, funnel health, and customer transactions from one command center.
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
                    PulseBoard is a responsive analytics dashboard demo designed for SaaS and e-commerce teams. It includes
                    interactive charts, sortable tables, CSV export, dark mode, and polished empty states.
                  </p>
                </div>
                <div className="grid gap-3 rounded-3xl bg-slate-950 p-4 text-white shadow-2xl shadow-slate-950/20 dark:bg-white dark:text-slate-950 sm:p-5">
                  <span className="text-sm font-semibold text-slate-300 dark:text-slate-500">Revenue/customer</span>
                  <span className="text-3xl font-black tracking-tight sm:text-4xl">{currencyFormatter.format(revenuePerCustomer)}</span>
                  <span className="text-sm text-slate-300 dark:text-slate-500">Last updated: Jul 24, 2026</span>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-4 sm:p-6">
              <h2 className="text-lg font-bold text-slate-950 dark:text-white">Key insights</h2>
              <div className="mt-4 space-y-4">
                {insights.map((item) => (
                  <article key={item.label} className="flex gap-3">
                    <div className={`mt-1 h-fit rounded-2xl p-2 ${item.tone}`}>
                      <item.icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-950 dark:text-white">{item.label}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">{item.copy}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Key performance indicators">
            {kpiCards.map((card) => (
              <StatCard
                key={card.key}
                title={card.title}
                value={formatMetric(metrics[card.key], card.prefix, card.suffix)}
                change={metrics[`${card.key}Change`]}
                icon={card.icon}
                tone={card.tone}
              />
            ))}
          </section>

          <section id="revenue-analytics" className="mt-4 scroll-mt-28 grid gap-4 lg:grid-cols-3" aria-label="Revenue and traffic analytics">
            <RevenueChart />
            <TrafficSourcesChart />
          </section>

          <section id="acquisition-analytics" className="mt-4 scroll-mt-28 grid gap-4 lg:grid-cols-3" aria-label="Channel and conversion analytics">
            <AcquisitionChart />
            <ConversionFunnel />
          </section>

          <section id="transactions" className="mt-4 scroll-mt-28 grid gap-4 lg:grid-cols-3" aria-label="Transaction records">
            <TransactionsTable transactions={transactions} search={search} />
          </section>
        </main>
      </div>

      <MobileBottomNav onOpenMenu={() => setSidebarOpen(true)} />

      {toast ? (
        <div
          role="status"
          className="fixed bottom-24 left-4 right-4 z-[60] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-2xl dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 sm:left-auto sm:max-w-sm lg:bottom-5"
        >
          {toast}
        </div>
      ) : null}
    </div>
  );
}
