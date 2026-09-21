export type StatTone = 'blue' | 'green' | 'amber' | 'purple';

export type StatItem = {
  title: string;
  value: string;
  change: string;
  icon: string;
  tone: StatTone;
};

export type QuickAction = {
  label: string;
  hint: string;
  icon: string;
  route: string;
};

export type ActivityItem = {
  title: string;
  status: 'success' | 'warning' | 'info';
  subtitle: string;
  time: string;
};

export type WorkloadItem = {
  label: string;
  percent: number;
};
