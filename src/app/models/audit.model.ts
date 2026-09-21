export type AuditRange = '24h' | '7d' | '30d' | '90d';
export type AuditFilterType = 'All' | 'Security' | 'Access' | 'System' | 'Generator';
export type TrendType = 'up' | 'down' | 'neutral';
export type EventStatus = 'Success' | 'Warning' | 'Info';

export interface AuditMetric {
  label: string;
  value: string;
  change: string;
  trend: TrendType;
  icon: string;
}

export interface AuditEvent {
  id: number;
  title: string;
  actor: string;
  time: string;
  type: AuditFilterType;
  status: EventStatus;
}

export interface ComplianceItem {
  label: string;
  value: number;
  tone: 'good' | 'warn';
}
