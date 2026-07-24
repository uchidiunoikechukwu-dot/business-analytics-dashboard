import { useMemo, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState
} from '@tanstack/react-table';
import { ArrowUpDown, Download, SearchX } from 'lucide-react';
import { Badge } from '../ui/Badge';
import type { Transaction, TransactionStatus } from '../../data/mockData';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
});

const statusOptions: Array<TransactionStatus | 'All'> = ['All', 'Paid', 'Pending', 'Refunded'];

const columnHelper = createColumnHelper<Transaction>();

const columns = [
  columnHelper.accessor('id', {
    header: 'Invoice',
    cell: (info) => <span className="font-mono text-xs font-semibold text-slate-600 dark:text-slate-300">{info.getValue()}</span>
  }),
  columnHelper.accessor('customer', {
    header: 'Customer',
    cell: (info) => {
      const row = info.row.original;
      return (
        <div>
          <p className="font-semibold text-slate-950 dark:text-white">{info.getValue()}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{row.email}</p>
        </div>
      );
    }
  }),
  columnHelper.accessor('product', {
    header: 'Product',
    cell: (info) => <span className="text-slate-600 dark:text-slate-300">{info.getValue()}</span>
  }),
  columnHelper.accessor('channel', {
    header: 'Channel',
    cell: (info) => (
      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
        {info.getValue()}
      </span>
    )
  }),
  columnHelper.accessor('date', {
    header: 'Date',
    cell: (info) => <span className="text-slate-600 dark:text-slate-300">{new Date(info.getValue()).toLocaleDateString()}</span>
  }),
  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: (info) => <span className="font-bold text-slate-950 dark:text-white">{currencyFormatter.format(info.getValue())}</span>
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => <Badge status={info.getValue()} />
  })
];

type TransactionsTableProps = {
  transactions: Transaction[];
  search: string;
};

function exportRowsAsCsv(rows: Transaction[]) {
  const headers = ['Invoice', 'Customer', 'Email', 'Product', 'Channel', 'Date', 'Amount', 'Status'];
  const csvRows = rows.map((row) =>
    [row.id, row.customer, row.email, row.product, row.channel, row.date, row.amount, row.status]
      .map((value) => `"${String(value).replace(/"/g, '""')}"`)
      .join(',')
  );
  const blob = new Blob([[headers.join(','), ...csvRows].join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'pulseboard-transactions.csv';
  link.click();
  URL.revokeObjectURL(url);
}

export function TransactionsTable({ transactions, search }: TransactionsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'date', desc: true }]);
  const [status, setStatus] = useState<TransactionStatus | 'All'>('All');

  const filteredTransactions = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return transactions.filter((item) => {
      const matchesStatus = status === 'All' || item.status === status;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [item.id, item.customer, item.email, item.product, item.channel, item.status]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [search, status, transactions]);

  const table = useReactTable({
    data: filteredTransactions,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  const visibleRows = table.getRowModel().rows;

  return (
    <section className="glass-panel overflow-hidden rounded-3xl lg:col-span-3">
      <div className="flex flex-col gap-4 border-b border-slate-200/80 p-4 dark:border-slate-800 sm:p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-950 dark:text-white">Recent transactions</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Mobile cards, desktop table, search, filters, sorting, and CSV export.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {statusOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setStatus(option)}
              className={`focus-ring flex-1 rounded-2xl px-3 py-2 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0 sm:flex-none ${
                status === option
                  ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {option}
            </button>
          ))}
          <button
            type="button"
            onClick={() => exportRowsAsCsv(filteredTransactions)}
            className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 px-3 py-2 text-sm font-bold text-white shadow-lg shadow-brand-600/20 transition hover:-translate-y-0.5 hover:bg-brand-700 active:translate-y-0 sm:w-auto"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Export CSV
          </button>
        </div>
      </div>

      {filteredTransactions.length > 0 ? (
        <>
          <div className="space-y-3 p-4 md:hidden">
            {visibleRows.map((row) => {
              const item = row.original;
              return (
                <article
                  key={item.id}
                  className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-base font-bold text-slate-950 dark:text-white">{item.customer}</p>
                      <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">{item.email}</p>
                    </div>
                    <Badge status={item.status} />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Amount</p>
                      <p className="mt-1 font-bold text-slate-950 dark:text-white">{currencyFormatter.format(item.amount)}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Date</p>
                      <p className="mt-1 font-bold text-slate-950 dark:text-white">
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Product</p>
                      <p className="mt-1 truncate font-bold text-slate-950 dark:text-white">{item.product}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Channel</p>
                      <p className="mt-1 font-bold text-slate-950 dark:text-white">{item.channel}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3 text-xs dark:border-slate-800">
                    <span className="font-mono font-semibold text-slate-500 dark:text-slate-400">{item.id}</span>
                    <button
                      type="button"
                      onClick={() => exportRowsAsCsv([item])}
                      className="focus-ring rounded-xl bg-slate-100 px-3 py-2 font-bold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                    >
                      Export row
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
              <thead className="bg-slate-50/80 dark:bg-slate-900/70">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        scope="col"
                        className="whitespace-nowrap px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                      >
                        {header.isPlaceholder ? null : (
                          <button
                            type="button"
                            onClick={header.column.getToggleSortingHandler()}
                            className="focus-ring inline-flex items-center gap-2 rounded-lg"
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            <ArrowUpDown className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white/40 dark:divide-slate-800 dark:bg-slate-900/40">
                {visibleRows.map((row) => (
                  <tr key={row.id} className="transition hover:bg-slate-50 dark:hover:bg-slate-800/70">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="whitespace-nowrap px-5 py-4 text-sm">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="grid place-items-center px-6 py-16 text-center">
          <div className="rounded-full bg-slate-100 p-4 text-slate-400 dark:bg-slate-800">
            <SearchX className="h-8 w-8" aria-hidden="true" />
          </div>
          <p className="mt-4 text-base font-bold text-slate-950 dark:text-white">No transactions found</p>
          <p className="mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
            Try a different search term or clear the status filter to view more records.
          </p>
        </div>
      )}
    </section>
  );
}
