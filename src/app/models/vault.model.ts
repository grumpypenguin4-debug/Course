export type VaultCategory = 'All' | 'Social' | 'Finance' | 'Work' | 'Personal';

export interface VaultEntry {
  title: string;
  category: string;
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
