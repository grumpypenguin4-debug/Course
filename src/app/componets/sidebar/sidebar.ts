import { Component, inject } from '@angular/core';
import { SidebarServices } from '../../services/sidebar-services';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { AppClickOutsideDirective } from '../../directive/.directive';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, AppClickOutsideDirective],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  sidebarServices = inject(SidebarServices);
  router = inject(Router);
  authService = inject(AuthService);

  constructor() {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed())
      .subscribe(() => {
        if (this.sidebarServices.isOpen()) {
          this.sidebarServices.toggleSidebar();
        }
      });
  }

  closeIfOpen(): void {
    if (this.sidebarServices.isOpen()) {
      this.sidebarServices.toggleSidebar();
    }
  }

  handleItemClick(item: any): void {
    if (item.isDisabled) {
      this.router.navigateByUrl('/unauthorized');
    }
  }

  onLogout(): void {
    this.authService.logout();
  }
}
