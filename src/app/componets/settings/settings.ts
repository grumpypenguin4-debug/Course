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
    { id: PagePermissions.HOME, label: 'Home', canDisable: false },
    { id: PagePermissions.PROFILE, label: 'Profile', canDisable: false },
    { id: PagePermissions.VAULT, label: 'Vault', canDisable: true },
    { id: PagePermissions.AUDIT, label: 'Audit', canDisable: true },
    { id: PagePermissions.GENERATOR, label: 'Generator', canDisable: true },
    { id: PagePermissions.SETTINGS, label: 'Settings', canDisable: false },
  ];

  hasPermission = computed(() => {
    const userPerms = this.authService.userPermissions();
    return (permission: PagePermissions) => userPerms.includes(permission);
  });

  togglePermission(permission: PagePermissions): void {
    this.authService.togglePermission(permission);
  }
}
