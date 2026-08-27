import { Component, inject, computed } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { PagePermissions } from '../../services/permissions.enum';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  authService = inject(AuthService);

  permissions = [
    { id: PagePermissions.HOME, label: 'الصفحة الرئيسية', canDisable: false },
    { id: PagePermissions.PROFILE, label: 'الملف الشخصي', canDisable: true },
    { id: PagePermissions.SETTINGS, label: 'الإعدادات', canDisable: true },
    { id: PagePermissions.EDIT_PROFILE, label: 'تعديل الملف الشخصي', canDisable: true },
    { id: PagePermissions.DELETE_ACCOUNT, label: 'حذف الحساب', canDisable: true }
  ];

  hasPermission = computed(() => {
    const userPerms = this.authService.userPermissions();
    return (permission: PagePermissions) => userPerms.includes(permission);
  });

  togglePermission(permission: PagePermissions): void {
    this.authService.togglePermission(permission);
  }
}
