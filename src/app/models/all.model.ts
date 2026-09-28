// ============================================
// Home Models
// ============================================
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

export const DEFAULT_HOME_DATA = {
  stats: [
    { title: 'Total Accounts', value: '1,248', change: '+12.4%', icon: 'fa-solid fa-users', tone: 'blue' as StatTone },
    { title: 'Approvals', value: '846', change: '+8.1%', icon: 'fa-solid fa-check', tone: 'green' as StatTone },
    { title: 'Pending Review', value: '94', change: '-3.2%', icon: 'fa-solid fa-hourglass-half', tone: 'amber' as StatTone },
    { title: 'Alerts', value: '19', change: '+2.7%', icon: 'fa-solid fa-bell', tone: 'purple' as StatTone },
  ] as StatItem[],

  quickActions: [
    { label: 'Create Report', hint: 'New report', icon: 'fa-solid fa-file', route: '/generator' },
    { label: 'Manage Vault', hint: 'Protected data', icon: 'fa-solid fa-building-columns', route: '/vault' },
    { label: 'Review Activity', hint: 'Change log', icon: 'fa-solid fa-clipboard-list', route: '/audit' },
    { label: 'Settings', hint: 'System settings', icon: 'fa-solid fa-gear', route: '/settings' },
  ] as QuickAction[],

  recentActivities: [
    { title: 'A new request was approved', subtitle: 'Accounts department', time: '10 minutes ago', status: 'success' },
    { title: 'Security policy was updated', subtitle: 'Management', time: '1 hour ago', status: 'info' },
    { title: 'Some accounts need review', subtitle: 'Security verification', time: '3 hours ago', status: 'warning' },
  ] as ActivityItem[],

  workload: [
    { label: 'Execution', percent: 72 },
    { label: 'Security', percent: 88 },
    { label: 'Stability', percent: 64 },
  ] as WorkloadItem[],
};


// ============================================
// Credentials Models
// ============================================
export interface GoogleWorkspaceCredential {
  title: string;
  category: string;
  email: string;
  password: string;
  domain: string;
  adminEmail: string;
  phone?: string;
  recoveryEmail?: string;
  icon: string;
  iconBg: string;
  accentColor?: string;
  strengthScore: number;
  strengthText: string;
  strengthColor: string;
}

export const DEFAULT_CREDENTIAL: GoogleWorkspaceCredential = {
  title: 'Google Workspace',
  category: 'Work',
  email: 'admin@yourdomain.com',
  password: 'YourPassword123!',
  domain: 'yourdomain.com',
  adminEmail: 'admin@yourdomain.com',
  phone: '+1 234 567 890',
  recoveryEmail: 'recovery@yourdomain.com',
  icon: 'fa-solid fa-cloud',
  iconBg: 'var(--color-card-bg)',
  accentColor: 'var(--color-accent-green)',
  strengthScore: 2,
  strengthText: 'Weak',
  strengthColor: 'var(--color-tertiary)',
};


// ============================================
// Vault Models
// ============================================
export type VaultCategory = 'All' | 'Social' | 'Finance' | 'Work' | 'Personal';

export interface VaultEntry {
  title: string;
  category: VaultCategory;
  plainPassword: string;
  showPassword?: boolean;
  icon: string;
  iconBg: string;
  accentColor?: string;
  strengthScore: number;
  strengthText: string;
  strengthColor: string;
  isArchived?: boolean;
  email?: string;
  domain?: string;
  adminEmail?: string;
  phone?: string;
  recoveryEmail?: string;
}

export const entries: VaultEntry[] = [
  {
    title: 'Chase Bank',
    category: 'Finance',
    plainPassword: 'SuperSecret123',
    showPassword: false,
    icon: 'fa-solid fa-building-columns',
    iconBg: 'var(--color-card-bg)',
    accentColor: 'var(--color-accent-green)',
    strengthScore: 5,
    strengthText: 'Strong',
    strengthColor: 'var(--color-accent-green)',
  },
  {
    title: 'Google Workspace',
    category: 'Work',
    plainPassword: 'WeakPassword!',
    showPassword: false,
    icon: 'fa-solid fa-cloud',
    iconBg: 'var(--color-card-bg)',
    accentColor: 'var(--color-accent-green)',
    strengthScore: 2,
    strengthText: 'Weak',
    strengthColor: 'var(--color-tertiary)',
    email: 'admin@yourdomain.com',
    domain: 'yourdomain.com',
    adminEmail: 'admin@yourdomain.com',
    phone: '+1 234 567 890',
    recoveryEmail: 'recovery@yourdomain.com',
  },
  {
    title: 'Old Blog Server',
    category: 'Personal',
    plainPassword: 'OldServerPass2020',
    showPassword: false,
    icon: 'fa-solid fa-globe',
    iconBg: 'var(--color-card-bg)',
    isArchived: true,
    strengthScore: 0,
    strengthText: '',
    strengthColor: '',
  },
];

export const credentialFromEntry = (entry: VaultEntry): GoogleWorkspaceCredential => ({
  title: entry.title,
  category: entry.category,
  email: entry.email ?? 'admin@yourdomain.com',
  password: entry.plainPassword,
  domain: entry.domain ?? 'yourdomain.com',
  adminEmail: entry.adminEmail ?? 'admin@yourdomain.com',
  phone: entry.phone ?? '+1 234 567 890',
  recoveryEmail: entry.recoveryEmail ?? 'recovery@yourdomain.com',
  icon: entry.icon,
  iconBg: entry.iconBg,
  accentColor: entry.accentColor ?? 'var(--color-accent-green)',
  strengthScore: entry.strengthScore,
  strengthText: entry.strengthText,
  strengthColor: entry.strengthColor,
});



// ============================================
// Audit Models
// ============================================
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

export const DEFAULT_AUDIT_DATA = {
  ranges: ['24h', '7d', '30d', '90d'] as AuditRange[],
  filters: ['All', 'Security', 'Access', 'System', 'Generator'] as AuditFilterType[],
  metrics: [
    { label: 'Total Actions', value: '1,284', change: '+12.4%', trend: 'up', icon: 'fa-solid fa-check' },
    { label: 'Failed Logins', value: '18', change: '-8.1%', trend: 'down', icon: 'fa-solid fa-triangle-exclamation' },
    { label: 'Policy Changes', value: '46', change: '+5.6%', trend: 'up', icon: 'fa-solid fa-file-pen' },
    { label: 'Vault Access', value: '93%', change: '+2.2%', trend: 'up', icon: 'fa-solid fa-lock' },
  ] as AuditMetric[],
  activity: [
    { id: 1, title: 'Password reset approved', actor: 'admin@fortress.io', time: '2 min ago', type: 'Security', status: 'Success' },
    { id: 2, title: 'Generator key rotation triggered', actor: 'automation-bot', time: '18 min ago', type: 'Generator', status: 'Info' },
    { id: 3, title: 'Multiple failed login attempts detected', actor: 'user@fortress.io', time: '41 min ago', type: 'Access', status: 'Warning' },
    { id: 4, title: 'Vault export performed', actor: 'security-admin', time: '1 hr ago', type: 'System', status: 'Success' },
    { id: 5, title: 'Permission update for billing module', actor: 'ops-team', time: '3 hrs ago', type: 'Security', status: 'Info' },
  ] as AuditEvent[],
  compliance: [
    { label: 'Authentication', value: 96, tone: 'good' },
    { label: 'Authorization', value: 91, tone: 'good' },
    { label: 'Encryption', value: 88, tone: 'warn' },
    { label: 'Backup Integrity', value: 79, tone: 'warn' },
  ] as ComplianceItem[],
};


// ============================================
// Profile Models
// ============================================
export type ProfileStat = {
  label: string;
  value: string;
  icon: string;
};
export const profile = {
  fullName: 'Mohamed Ali',
  email: 'mohamed.ali@example.com',
  phone: '+966 55 123 4567',
  location: 'Libaya, Tripoli',
  joinedAt: '2020-01-15',
  bio: 'Passionate frontend developer with 5 years of experience in building responsive web applications. Skilled in Angular, React, and Vue.js. Always eager to learn new technologies and improve coding skills.',
  status: 'Active',
  avatar: 'https://media.istockphoto.com/id/2168774111/vector/avatar-or-person-sign-profile-picture-portrait-icon-user-profile-symbol.jpg?s=612x612&w=0&k=20&c=6qw1LRG53z00RXJnVKQC58W7XnW2gdQfGBIR43E97Oc=',
  stats: [
    { label: 'Followers', value: '2.4K', icon: 'fa-solid fa-users' },
  ] as ProfileStat[],
};

// ============================================
// Sidebar Models
// ============================================
import { PagePermissions } from '../services/permissions.enum';

export interface SidebarItem {
  id: number;
  title: string;
  icon: string;
  route: string;
  permission: PagePermissions;
  canDisable?: boolean;
}

// ============================================
// Dialog Models
// ============================================
export interface DialogData {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
}
