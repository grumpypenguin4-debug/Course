import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { PagePermissions } from '../../services/permissions.enum';

@Component({
  selector: 'app-unauthorized',
  imports: [],
  templateUrl: './unauthorized.html',
  styleUrl: './unauthorized.scss',
})
export class Unauthorized {
  router = inject(Router);
  auth = inject(AuthService);

  goHome(): void {
    if (this.auth.hasPermission(PagePermissions.HOME)) {
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
