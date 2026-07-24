import { BarChart3, Home, Menu, ReceiptText } from 'lucide-react';

type MobileBottomNavProps = {
  onOpenMenu: () => void;
};

const mobileLinks = [
  { label: 'Home', href: '#main-content', icon: Home },
  { label: 'Charts', href: '#revenue-analytics', icon: BarChart3 },
  { label: 'Records', href: '#transactions', icon: ReceiptText }
];

export function MobileBottomNav({ onOpenMenu }: MobileBottomNavProps) {
  return (
    <nav
      aria-label="Mobile quick navigation"
      className="fixed inset-x-3 bottom-3 z-40 rounded-[1.75rem] border border-slate-200/80 bg-white/95 p-2 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95 lg:hidden"
    >
      <div className="grid grid-cols-4 gap-1">
        {mobileLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="focus-ring flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-xs font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 active:scale-95 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <item.icon className="h-5 w-5" aria-hidden="true" />
            {item.label}
          </a>
        ))}
        <button
          type="button"
          onClick={onOpenMenu}
          className="focus-ring flex flex-col items-center justify-center gap-1 rounded-2xl bg-slate-950 px-2 py-2 text-xs font-bold text-white transition active:scale-95 dark:bg-white dark:text-slate-950"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
          Menu
        </button>
      </div>
    </nav>
  );
}
