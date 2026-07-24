import type { TransactionStatus } from '../../data/mockData';

type BadgeProps = {
  status: TransactionStatus;
};

const statusClasses: Record<TransactionStatus, string> = {
  Paid: 'bg-emerald-100 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-950 dark:text-emerald-300',
  Pending: 'bg-amber-100 text-amber-700 ring-amber-600/20 dark:bg-amber-950 dark:text-amber-300',
  Refunded: 'bg-rose-100 text-rose-700 ring-rose-600/20 dark:bg-rose-950 dark:text-rose-300'
};

export function Badge({ status }: BadgeProps) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusClasses[status]}`}>
      {status}
    </span>
  );
}
