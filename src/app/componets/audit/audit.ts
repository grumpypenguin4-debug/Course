import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { AuditRange, AuditFilterType, AuditMetric, AuditEvent, ComplianceItem, DEFAULT_AUDIT_DATA } from '../../models';

@Component({
  selector: 'app-audit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit.html',
  styleUrl: './audit.scss',
})
export class Audit {
  ranges: AuditRange[] = DEFAULT_AUDIT_DATA.ranges;
  filters: AuditFilterType[] = DEFAULT_AUDIT_DATA.filters;
  metrics: AuditMetric[] = DEFAULT_AUDIT_DATA.metrics;
  activity: AuditEvent[] = DEFAULT_AUDIT_DATA.activity;
  compliance: ComplianceItem[] = DEFAULT_AUDIT_DATA.compliance;

  selectedRange = signal<AuditRange>('7d');
  selectedFilter = signal<AuditFilterType>('All');
  filteredActivity = computed(() => {

    const filter = this.selectedFilter();
    return filter === 'All' ? this.activity : this.activity.filter((event) => event.type === filter);
  });

  setRange(range: AuditRange): void {
    this.selectedRange.set(range);
  }

  setFilter(filter: AuditFilterType): void {
    this.selectedFilter.set(filter);
  }
}
