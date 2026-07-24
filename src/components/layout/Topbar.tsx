import { useState } from 'react';
import {
  Bell,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  Search,
  Sun,
  UserCircle
} from 'lucide-react';
import { periods, type Period } from '../../data/mockData';

type TopbarProps = {
  isDark: boolean;
  onToggleDark: () => void;
  onOpenSidebar: () => void;
  period: Period;
  onPeriodChange: (period: Period) => void;
  search: string;
  onSearchChange: (value: string) => void;
  onAction: (message: string) => void;
};

export function Topbar({
  isDark,
  onToggleDark,
  onOpenSidebar,
  period,
  onPeriodChange,
  search,
  onSearchChange,
  onAction
}: TopbarProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleNotificationAction = () => {
    setNotificationsOpen(false);
    onAction('All notifications marked as read.');
  };

  const handleProfileAction = (message: string) => {
    setProfileOpen(false);
    onAction(message);
  };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-slate-50/80 px-4 py-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onOpenSidebar}
            className="focus-ring rounded-2xl border border-slate-200 bg-white p-3 text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:text-slate-950 active:translate-y-0 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-white lg:hidden"
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
          <div>
            <p className="text-sm font-semibold text-brand-600 dark:text-brand-300">Executive overview</p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
              Business analytics dashboard
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative block sm:w-72">
            <span className="sr-only">Search customers or transactions</span>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search transactions..."
              className="focus-ring w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </label>

          <label className="relative block sm:w-48">
            <span className="sr-only">Select reporting period</span>
            <CalendarDays
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            />
            <select
              value={period}
              onChange={(event) => onPeriodChange(event.target.value as Period)}
              className="focus-ring w-full appearance-none rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-semibold text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
            >
              {periods.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
            <button
              type="button"
              onClick={onToggleDark}
              className="focus-ring rounded-2xl border border-slate-200 bg-white p-3 text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:text-slate-950 active:translate-y-0 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-white"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setNotificationsOpen((value) => !value);
                  setProfileOpen(false);
                }}
                className="focus-ring relative rounded-2xl border border-slate-200 bg-white p-3 text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:text-slate-950 active:translate-y-0 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-white"
                aria-label="View notifications"
                aria-expanded={notificationsOpen}
              >
                <Bell className="h-5 w-5" aria-hidden="true" />
                <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
              </button>

              {notificationsOpen ? (
                <div className="absolute right-0 top-14 z-30 w-80 rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                  <div className="px-2 py-2">
                    <p className="text-sm font-bold text-slate-950 dark:text-white">Notifications</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Demo updates from your analytics workspace.</p>
                  </div>
                  <div className="space-y-2">
                    {['Revenue target is 82% complete', 'Referral traffic is up 31%', 'Two invoices are pending review'].map(
                      (item) => (
                        <div key={item} className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          {item}
                        </div>
                      )
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleNotificationAction}
                    className="focus-ring mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 active:translate-y-0 dark:bg-white dark:text-slate-950"
                  >
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    Mark all as read
                  </button>
                </div>
              ) : null}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setProfileOpen((value) => !value);
                  setNotificationsOpen(false);
                }}
                className="focus-ring flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-left shadow-sm transition hover:-translate-y-0.5 active:translate-y-0 dark:border-slate-800 dark:bg-slate-900"
                aria-label="Open user menu"
                aria-expanded={profileOpen}
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400 text-sm font-bold text-white">
                  AD
                </span>
                <span className="hidden sm:block">
                  <span className="block text-sm font-bold text-slate-950 dark:text-white">Ikechukwu Paul</span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">Growth lead</span>
                </span>
                <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" aria-hidden="true" />
              </button>

              {profileOpen ? (
                <div className="absolute right-0 top-14 z-30 w-64 rounded-3xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                  <button
                    type="button"
                    onClick={() => handleProfileAction('Profile settings opened. Demo action only.')}
                    className="focus-ring flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <UserCircle className="h-5 w-5" aria-hidden="true" />
                    Profile settings
                  </button>
                  <button
                    type="button"
                    onClick={() => handleProfileAction('Team workspace opened. Demo action only.')}
                    className="focus-ring flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <Building2 className="h-5 w-5" aria-hidden="true" />
                    Team workspace
                  </button>
                  <button
                    type="button"
                    onClick={() => handleProfileAction('Sign out is disabled in this demo dashboard.')}
                    className="focus-ring flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold text-rose-600 transition hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-950"
                  >
                    <LogOut className="h-5 w-5" aria-hidden="true" />
                    Sign out demo
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
