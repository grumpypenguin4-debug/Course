import { CommonModule } from '@angular/common';
import { Component, computed, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleWorkspaceCredential, VaultCategory, VaultEntry, credentialFromEntry, entries } from '../../models';

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

  entries: VaultEntry[] = entries;

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

    const credential: GoogleWorkspaceCredential = credentialFromEntry(entry);
    this.router.navigate(['/credentials'], { state: { entry: credential } });
  }
}
