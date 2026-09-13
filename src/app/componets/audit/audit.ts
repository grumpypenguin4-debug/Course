import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

type AuditRange = '24h' | '7d' | '30d' | '90d';
type AuditFilterType = 'All' | 'Security' | 'Access' | 'System' | 'Generator';
type TrendType = 'up' | 'down' | 'neutral';
type EventStatus = 'Success' | 'Warning' | 'Info';

interface AuditMetric {
  label: string;
  value: string;
  change: string;
  trend: TrendType;
  icon: string;
}

interface AuditEvent {
  id: number;
  title: string;
  actor: string;
  time: string;
  type: AuditFilterType;
  status: EventStatus;
}

interface ComplianceItem {
  label: string;
  value: number;
  tone: 'good' | 'warn';
}

@Component({
  selector: 'app-audit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit.html',
  styleUrl: './audit.scss',
})
export class Audit {
  ranges: AuditRange[] = ['24h', '7d', '30d', '90d'];
  filters: AuditFilterType[] = ['All', 'Security', 'Access', 'System', 'Generator'];

  selectedRange = signal<AuditRange>('7d');
  selectedFilter = signal<AuditFilterType>('All');

  metrics: AuditMetric[] = [
    { label: 'Total Actions', value: '1,284', change: '+12.4%', trend: 'up', icon: 'fa-solid fa-check' },
    { label: 'Failed Logins', value: '18', change: '-8.1%', trend: 'down', icon: 'fa-solid fa-triangle-exclamation' },
    { label: 'Policy Changes', value: '46', change: '+5.6%', trend: 'up', icon: 'fa-solid fa-file-pen' },
    { label: 'Vault Access', value: '93%', change: '+2.2%', trend: 'up', icon: 'fa-solid fa-lock' },
  ];

  activity: AuditEvent[] = [
    { id: 1, title: 'Password reset approved', actor: 'admin@fortress.io', time: '2 min ago', type: 'Security', status: 'Success' },
    { id: 2, title: 'Generator key rotation triggered', actor: 'automation-bot', time: '18 min ago', type: 'Generator', status: 'Info' },
    { id: 3, title: 'Multiple failed login attempts detected', actor: 'user@fortress.io', time: '41 min ago', type: 'Access', status: 'Warning' },
    { id: 4, title: 'Vault export performed', actor: 'security-admin', time: '1 hr ago', type: 'System', status: 'Success' },
    { id: 5, title: 'Permission update for billing module', actor: 'ops-team', time: '3 hrs ago', type: 'Security', status: 'Info' },
  ];

  compliance: ComplianceItem[] = [
    { label: 'Authentication', value: 96, tone: 'good' },
    { label: 'Authorization', value: 91, tone: 'good' },
    { label: 'Encryption', value: 88, tone: 'warn' },
    { label: 'Backup Integrity', value: 79, tone: 'warn' },
  ];


  filteredActivity = computed(() => {
    const filter = this.selectedFilter();
    return filter === 'All'
      ? this.activity
      : this.activity.filter(event => event.type === filter);
  });

  setRange(range: AuditRange): void {
    this.selectedRange.set(range);
  }

  setFilter(filter: AuditFilterType): void {
    this.selectedFilter.set(filter);
  }
}
