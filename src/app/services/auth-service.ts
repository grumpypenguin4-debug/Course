import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PagePermissions } from './permissions.enum';

@Injectable({ providedIn: 'root' })
export class AuthService {

  token = signal<string | null>(localStorage.getItem('token'));
  userPermissionsSignal = signal<PagePermissions[]>([]);

  constructor() {
    const saved = localStorage.getItem('permissions');
    if (saved) {
      this.userPermissionsSignal.set(JSON.parse(saved));
    }
  }

  isLoggedIn = computed(() => !!this.token());
  userPermissions = computed(() => this.userPermissionsSignal());
  router = inject(Router);

  hasPermission(permission: PagePermissions): boolean {
    return this.userPermissionsSignal().includes(permission);
  }

  getRequiredPermissionForRoute(routePath: string): PagePermissions | undefined {
    const map: Record<string, PagePermissions> = {
      '/home': PagePermissions.HOME,
      '/profile': PagePermissions.PROFILE,
      '/settings': PagePermissions.SETTINGS
    };
    return map[routePath];
  }

  login(email: string, password: string): boolean {
    if (email !== 'Moh@154' || password !== '1542000') return false;

    const fakeToken = btoa(JSON.stringify({ email, exp: Date.now() + 86400000 }));
    localStorage.setItem('token', fakeToken);
    this.token.set(fakeToken);

    this.userPermissionsSignal.set([
      PagePermissions.HOME,
      PagePermissions.PROFILE,
      PagePermissions.VAULT,
      PagePermissions.AUDIT,
      PagePermissions.GENERATOR,
      PagePermissions.SETTINGS,
    ]);

    return true;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.token.set(null);
    this.userPermissionsSignal.set([]);
    this.router.navigateByUrl('/login');
  }

  getToken = () => this.token();

  updatePermissions(permissions: PagePermissions[]): void {
    this.userPermissionsSignal.set(permissions);
    localStorage.setItem('permissions', JSON.stringify(permissions));
  }

  togglePermission(permission: PagePermissions): void {
    const current = this.userPermissionsSignal();
    let updated: PagePermissions[];

    if (current.includes(permission)) {
      updated = current.filter(p => p !== permission);
    } else {
      updated = [...current, permission];
    }

    this.updatePermissions(updated);
  }
}
