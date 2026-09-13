import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SidebarServices } from '../../services/sidebar-services';
import { AuthService } from '../../services/auth-service';
import { PagePermissions } from '../../services/permissions.enum';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-headr',
  imports: [],
  templateUrl: './headr.html',
  styleUrl: './headr.scss',
})
export class Headr {
  sidebarServices = inject(SidebarServices);
  router = inject(Router);
  authService = inject(AuthService);

  currentRouteTitle = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => this.getTitleFromUrl(event.urlAfterRedirects))
    ),
    { initialValue: this.getTitleFromUrl(this.router.url) }
  );

  getTitleFromUrl(url: string): string {
    if (url.includes('/profile')) return 'Profile';
    if (url.includes('/vault')) return 'Vault';
    if (url.includes('/audit')) return 'Audit';
    if (url.includes('/generator')) return 'Generator';
    if (url.includes('/settings')) return 'Settings';
    if (url.includes('/login')) return 'Login';
    return 'Home';
  }

  goToHome(): void {
    if (this.authService.hasPermission(PagePermissions.HOME)) {
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('/unauthorized');
    }
  }
}

