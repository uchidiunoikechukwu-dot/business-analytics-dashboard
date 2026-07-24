import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  ShoppingBag,
  Users
} from 'lucide-react';

export type Period = '7d' | '30d' | '90d' | '12m';
export type TransactionStatus = 'Paid' | 'Pending' | 'Refunded';
export type Transaction = {
  id: string;
  customer: string;
  email: string;
  product: string;
  channel: 'Organic' | 'Paid Ads' | 'Referral' | 'Social' | 'Email';
  date: string;
  amount: number;
  status: TransactionStatus;
};

export const periods: Array<{ label: string; value: Period }> = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 90 days', value: '90d' },
  { label: 'Last 12 months', value: '12m' }
];

export const metricsByPeriod = {
  '7d': {
    revenue: 42840,
    revenueChange: 9.8,
    customers: 3842,
    customersChange: 5.1,
    orders: 1218,
    ordersChange: -1.6,
    conversion: 6.4,
    conversionChange: 1.2
  },
  '30d': {
    revenue: 184520,
    revenueChange: 16.4,
    customers: 18864,
    customersChange: 8.7,
    orders: 5436,
    ordersChange: 4.9,
    conversion: 7.1,
    conversionChange: 2.8
  },
  '90d': {
    revenue: 512930,
    revenueChange: 22.6,
    customers: 58320,
    customersChange: 14.2,
    orders: 16284,
    ordersChange: 9.4,
    conversion: 7.8,
    conversionChange: 3.5
  },
  '12m': {
    revenue: 2418200,
    revenueChange: 31.9,
    customers: 284120,
    customersChange: 24.8,
    orders: 82340,
    ordersChange: 18.3,
    conversion: 8.2,
    conversionChange: 4.4
  }
} satisfies Record<Period, Record<string, number>>;

export const kpiCards = [
  {
    key: 'revenue',
    title: 'Total revenue',
    icon: DollarSign,
    prefix: '$',
    suffix: '',
    tone: 'indigo'
  },
  {
    key: 'customers',
    title: 'Active customers',
    icon: Users,
    prefix: '',
    suffix: '',
    tone: 'cyan'
  },
  {
    key: 'orders',
    title: 'Orders processed',
    icon: ShoppingBag,
    prefix: '',
    suffix: '',
    tone: 'emerald'
  },
  {
    key: 'conversion',
    title: 'Conversion rate',
    icon: CreditCard,
    prefix: '',
    suffix: '%',
    tone: 'amber'
  }
] as const;

export const revenueTrend = [
  { label: 'Jan', revenue: 148000, profit: 62000, customers: 12300 },
  { label: 'Feb', revenue: 163000, profit: 69000, customers: 13600 },
  { label: 'Mar', revenue: 158500, profit: 64600, customers: 12950 },
  { label: 'Apr', revenue: 184200, profit: 78200, customers: 15200 },
  { label: 'May', revenue: 201400, profit: 84200, customers: 17100 },
  { label: 'Jun', revenue: 214800, profit: 92000, customers: 18450 },
  { label: 'Jul', revenue: 236700, profit: 102400, customers: 20100 },
  { label: 'Aug', revenue: 228900, profit: 98400, customers: 19320 },
  { label: 'Sep', revenue: 248400, profit: 109300, customers: 21200 },
  { label: 'Oct', revenue: 263900, profit: 118700, customers: 22700 },
  { label: 'Nov', revenue: 291500, profit: 129200, customers: 24800 },
  { label: 'Dec', revenue: 318200, profit: 143600, customers: 26900 }
];

export const acquisitionChannels = [
  { channel: 'Organic', users: 18420, revenue: 126200, conversion: 8.6 },
  { channel: 'Paid Ads', users: 13240, revenue: 98240, conversion: 7.2 },
  { channel: 'Referral', users: 8120, revenue: 76800, conversion: 9.4 },
  { channel: 'Social', users: 10480, revenue: 57400, conversion: 4.9 },
  { channel: 'Email', users: 6240, revenue: 63900, conversion: 10.7 }
];

export const sourceShare = [
  { name: 'Organic Search', value: 38, color: '#6366f1' },
  { name: 'Paid Ads', value: 24, color: '#22d3ee' },
  { name: 'Referral', value: 16, color: '#34d399' },
  { name: 'Social', value: 14, color: '#f59e0b' },
  { name: 'Email', value: 8, color: '#f43f5e' }
];

export const funnel = [
  { stage: 'Website visitors', value: 48520, rate: 100 },
  { stage: 'Product views', value: 31840, rate: 65.6 },
  { stage: 'Checkout started', value: 12860, rate: 26.5 },
  { stage: 'Payment completed', value: 5436, rate: 11.2 },
  { stage: 'Repeat purchase', value: 1860, rate: 3.8 }
];

export const transactions: Transaction[] = [
  {
    id: 'PB-10382',
    customer: 'Maya Peterson',
    email: 'maya.peterson@example.com',
    product: 'Scale Plan',
    channel: 'Organic',
    date: '2026-07-23',
    amount: 2480,
    status: 'Paid'
  },
  {
    id: 'PB-10381',
    customer: 'Daniel Okafor',
    email: 'daniel.okafor@example.com',
    product: 'Analytics Add-on',
    channel: 'Referral',
    date: '2026-07-23',
    amount: 890,
    status: 'Paid'
  },
  {
    id: 'PB-10380',
    customer: 'Priya Shah',
    email: 'priya.shah@example.com',
    product: 'Enterprise Seat',
    channel: 'Paid Ads',
    date: '2026-07-22',
    amount: 4280,
    status: 'Pending'
  },
  {
    id: 'PB-10379',
    customer: 'Noah Williams',
    email: 'noah.williams@example.com',
    product: 'Growth Plan',
    channel: 'Email',
    date: '2026-07-22',
    amount: 1490,
    status: 'Paid'
  },
  {
    id: 'PB-10378',
    customer: 'Aisha Bello',
    email: 'aisha.bello@example.com',
    product: 'Scale Plan',
    channel: 'Social',
    date: '2026-07-21',
    amount: 2480,
    status: 'Paid'
  },
  {
    id: 'PB-10377',
    customer: 'Lucas Meyer',
    email: 'lucas.meyer@example.com',
    product: 'Starter Plan',
    channel: 'Organic',
    date: '2026-07-20',
    amount: 490,
    status: 'Refunded'
  },
  {
    id: 'PB-10376',
    customer: 'Emily Johnson',
    email: 'emily.johnson@example.com',
    product: 'Growth Plan',
    channel: 'Paid Ads',
    date: '2026-07-20',
    amount: 1490,
    status: 'Paid'
  },
  {
    id: 'PB-10375',
    customer: 'Kenji Tanaka',
    email: 'kenji.tanaka@example.com',
    product: 'Enterprise Seat',
    channel: 'Referral',
    date: '2026-07-19',
    amount: 4280,
    status: 'Paid'
  },
  {
    id: 'PB-10374',
    customer: 'Sofia Martins',
    email: 'sofia.martins@example.com',
    product: 'Analytics Add-on',
    channel: 'Email',
    date: '2026-07-19',
    amount: 890,
    status: 'Pending'
  },
  {
    id: 'PB-10373',
    customer: 'Omar Hassan',
    email: 'omar.hassan@example.com',
    product: 'Scale Plan',
    channel: 'Organic',
    date: '2026-07-18',
    amount: 2480,
    status: 'Paid'
  },
  {
    id: 'PB-10372',
    customer: 'Charlotte Dubois',
    email: 'charlotte.dubois@example.com',
    product: 'Starter Plan',
    channel: 'Social',
    date: '2026-07-18',
    amount: 490,
    status: 'Paid'
  },
  {
    id: 'PB-10371',
    customer: 'Mateo García',
    email: 'mateo.garcia@example.com',
    product: 'Growth Plan',
    channel: 'Paid Ads',
    date: '2026-07-17',
    amount: 1490,
    status: 'Paid'
  }
];

export const insights = [
  {
    label: 'Revenue acceleration',
    copy: 'Revenue is up 16.4% month-over-month, led by Enterprise Seat upgrades and referral traffic.',
    icon: ArrowUpRight,
    tone: 'text-emerald-600 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-950'
  },
  {
    label: 'Paid ads efficiency',
    copy: 'Paid acquisition is converting 1.4 points below the blended average. Review campaign targeting.',
    icon: ArrowDownRight,
    tone: 'text-amber-700 bg-amber-100 dark:text-amber-300 dark:bg-amber-950'
  },
  {
    label: 'Retention opportunity',
    copy: 'Repeat purchase rate is 3.8%. Add onboarding email nudges to lift secondary purchases.',
    icon: ArrowUpRight,
    tone: 'text-indigo-600 bg-indigo-100 dark:text-indigo-300 dark:bg-indigo-950'
  }
];
