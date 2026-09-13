import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type StatTone = 'blue' | 'green' | 'amber' | 'purple';

type StatItem = {
  title: string;
  value: string;
  change: string;
  icon: string;
  tone: StatTone;
};

type QuickAction = {
  label: string;
  hint: string;
  icon: string;
  route: string;
};

type ActivityItem = {
  title: string;
  status: 'success' | 'warning' | 'info';
  subtitle: string;
  time: string;
};

type WorkloadItem = {
  label: string;
  percent: number;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  today = new Date();

  stats: StatItem[] = [
    { title: 'Total Accounts', value: '1,248', change: '+12.4%', icon: 'fa-solid fa-users', tone: 'blue' },
    { title: 'Approvals', value: '846', change: '+8.1%', icon: 'fa-solid fa-check', tone: 'green' },
    { title: 'Pending Review', value: '94', change: '-3.2%', icon: 'fa-solid fa-hourglass-half', tone: 'amber' },
    { title: 'Alerts', value: '19', change: '+2.7%', icon: 'fa-solid fa-bell', tone: 'purple' },
  ];

  quickActions: QuickAction[] = [
    { label: 'Create Report', hint: 'New report', icon: 'fa-solid fa-file', route: '/generator' },
    { label: 'Manage Vault', hint: 'Protected data', icon: 'fa-solid fa-building-columns', route: '/vault' },
    { label: 'Review Activity', hint: 'Change log', icon: 'fa-solid fa-clipboard-list', route: '/audit' },
    { label: 'Settings', hint: 'System settings', icon: 'fa-solid fa-gear', route: '/settings' },
  ];

  recentActivities: ActivityItem[] = [
    { title: 'A new request was approved', subtitle: 'Accounts department', time: '10 minutes ago', status: 'success' },
    { title: 'Security policy was updated', subtitle: 'Management', time: '1 hour ago', status: 'info' },
    { title: 'Some accounts need review', subtitle: 'Security verification', time: '3 hours ago', status: 'warning' },
  ];

  workload: WorkloadItem[] = [
    { label: 'Execution', percent: 72 },
    { label: 'Security', percent: 88 },
    { label: 'Stability', percent: 64 },
  ];


  formattedDate: string = this.today.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
