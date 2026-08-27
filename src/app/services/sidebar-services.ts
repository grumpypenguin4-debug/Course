import { Injectable, signal, computed, inject } from '@angular/core';
import { AuthService } from './auth-service';
import { PagePermissions } from './permissions.enum';

interface SidebarItem {
  id: number;
  title: string;
  icon: string;
  route: string;
  permission: PagePermissions;
  canDisable?: boolean;
}

@Injectable({ providedIn: 'root' })
export class SidebarServices {

  isOpen = signal<boolean>(false);
  authService = inject(AuthService);

  sidebarItems: SidebarItem[] = [
    { id: 1, title: 'الرئيسية', icon: 'Home', route: '/home', permission: PagePermissions.HOME, canDisable: false },
    { id: 2, title: 'الملف الشخصي', icon: 'Person', route: '/profile', permission: PagePermissions.PROFILE, canDisable: true },
    { id: 3, title: 'الإعدادات', icon: 'Settings', route: '/settings', permission: PagePermissions.SETTINGS, canDisable: true }
  ];

  visibleSidebarItems = computed(() => {
    return this.sidebarItems.map(item => ({
      ...item,
      isDisabled: item.canDisable === false ? false : !this.authService.hasPermission(item.permission),
      isVisible: item.id === 1 ? true : this.authService.hasPermission(item.permission) || item.canDisable === false
    })).filter(item => item.isVisible);
  });

  toggleSidebar() {
    this.isOpen.update(value => !value);
  }
}

