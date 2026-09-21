import { Component, inject } from '@angular/core';
import { SidebarServices } from '../../services/sidebar-services';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { AppClickOutsideDirective } from '../../directive/clickoutside';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, DialogData } from '../dialog-component/dialog-component';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, AppClickOutsideDirective, MatButton, MatButtonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  sidebarServices = inject(SidebarServices);
  router = inject(Router);
  authService = inject(AuthService);
  dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const data: DialogData = {
      title: 'Confirm Logout',
      message: 'Are you sure you want to log out?',
      cancelLabel: 'No',
      confirmLabel: 'Yes',
      onConfirm: () => this.onLogout(),
    };
    this.dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data,
    });
  }

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
