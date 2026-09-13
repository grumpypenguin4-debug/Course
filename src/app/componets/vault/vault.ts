import { CommonModule } from '@angular/common';
import { Component, computed, signal, inject } from '@angular/core';
import { Router } from '@angular/router';

type VaultCategory = 'All' | 'Social' | 'Finance' | 'Work' | 'Personal';

interface VaultEntry {
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

@Component({
  selector: 'app-vault',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vault.html',
  styleUrl: './vault.scss',
})
export class Vault {
  router = inject(Router);

  encryptedEntriesCount = 142;

  categories: VaultCategory[] = ['All', 'Social', 'Finance', 'Work', 'Personal'];
  selectedCategory = signal<VaultCategory>('All');

  entries: VaultEntry[] = [
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


  filteredEntries = computed(() => {
    const category = this.selectedCategory();
    if (category === 'All') {
      return this.entries;
    }
    return this.entries.filter((e) => e.category === category);
  });

  selectCategory(category: VaultCategory): void {
    this.selectedCategory.set(category);
  }

  togglePasswordVisibility(entry: VaultEntry): void {
    entry.showPassword = !entry.showPassword;
  }

  copyPassword(password: string): void {
    navigator.clipboard.writeText(password).then(() => {
      console.log('Password copied to clipboard');
    });
  }

  onAddNewEntry(): void {
    console.log('Open Add New Entry Modal');
  }

  openCredentials(entry: VaultEntry): void {
    if (entry.title !== 'Google Workspace') {
      return;
    }

    this.router.navigate(['/credentials']);
  }
}
