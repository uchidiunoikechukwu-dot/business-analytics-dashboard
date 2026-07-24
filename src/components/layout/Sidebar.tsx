import {
  BarChart3,
  CreditCard,
  HelpCircle,
  LayoutDashboard,
  LineChart,
  Settings,
  ShoppingCart,
  Users,
  X
} from 'lucide-react';

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  onAction: (message: string) => void;
};

const navigation = [
  { name: 'Overview', icon: LayoutDashboard, href: '#main-content', current: true },
  { name: 'Revenue', icon: LineChart, href: '#revenue-analytics', current: false },
  { name: 'Customers', icon: Users, href: '#transactions', current: false },
  { name: 'Orders', icon: ShoppingCart, href: '#transactions', current: false },
  { name: 'Billing', icon: CreditCard, href: '#transactions', current: false }
];

const secondaryNavigation = [
  { name: 'Settings', icon: Settings, message: 'Settings is a demo action for this portfolio dashboard.' },
  { name: 'Help Center', icon: HelpCircle, message: 'Help Center is a demo action for this portfolio dashboard.' }
];

function SidebarContent({ onClose, onAction }: { onClose?: () => void; onAction: (message: string) => void }) {
  const handleViewReport = () => {
    document.getElementById('acquisition-analytics')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    onAction('Opened the channel performance report.');
    onClose?.();
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-6 py-6">
        <a href="#main-content" className="flex items-center gap-3" aria-label="PulseBoard home" onClick={onClose}>
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-indigo-500/20 dark:bg-white dark:text-slate-950">
            <BarChart3 className="h-6 w-6" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-lg font-bold tracking-tight text-slate-950 dark:text-white">PulseBoard</span>
            <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">Analytics OS</span>
          </span>
        </a>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="focus-ring rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        ) : null}
      </div>

      <nav className="flex-1 space-y-8 px-4" aria-label="Dashboard navigation">
        <div className="space-y-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${
                item.current
                  ? 'bg-slate-950 text-white shadow-lg shadow-indigo-500/20 dark:bg-white dark:text-slate-950'
                  : 'text-slate-600 hover:bg-white hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
              }`}
            >
              <item.icon className="h-5 w-5" aria-hidden="true" />
              {item.name}
            </a>
          ))}
        </div>

        <div>
          <p className="px-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Support</p>
          <div className="mt-3 space-y-2">
            {secondaryNavigation.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => {
                  onAction(item.message);
                  onClose?.();
                }}
                className="focus-ring group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold text-slate-600 transition hover:-translate-y-0.5 hover:bg-white hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <item.icon className="h-5 w-5" aria-hidden="true" />
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="m-4 rounded-3xl bg-gradient-to-br from-brand-600 to-cyan-500 p-5 text-white shadow-2xl shadow-brand-500/20">
        <p className="text-sm font-semibold">Pro insight</p>
        <p className="mt-2 text-sm text-white/80">Referral customers convert 31% better than paid ads this month.</p>
        <button
          type="button"
          onClick={handleViewReport}
          className="focus-ring mt-4 rounded-2xl bg-white px-4 py-2 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100 active:translate-y-0"
        >
          View report
        </button>
      </div>
    </div>
  );
}

export function Sidebar({ isOpen, onClose, onAction }: SidebarProps) {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-slate-200/80 bg-slate-100/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80 lg:block">
        <SidebarContent onAction={onAction} />
      </aside>

      {isOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/60"
            aria-label="Close navigation overlay"
            onClick={onClose}
          />
          <aside className="relative h-full w-80 max-w-[85vw] border-r border-slate-200 bg-slate-50 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
            <SidebarContent onClose={onClose} onAction={onAction} />
          </aside>
        </div>
      ) : null}
    </>
  );
}
