import { Directive, Input, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core';
import { AuthService } from '../services/auth-service';

@Directive({
  selector: '[appMyProfileDirective]',
  standalone: true,
})
export class MyProfileDirectiveDirective {
  templateRef = inject(TemplateRef<unknown>);
  viewContainer = inject(ViewContainerRef);
  authService = inject(AuthService);

  requiredPermission = '';

  @Input() set appMyProfileDirective(requiredPermission: string | null | undefined) {
    this.requiredPermission = requiredPermission ?? '';
    this.updateView();
  }

  constructor() {
    effect(() => {
      this.authService.userPermissionsSignal();
      this.updateView();
    });
  }

  updateView(): void {
    if (!this.requiredPermission) {
      this.viewContainer.clear();
      return;
    }

    const hasPermission = this.authService.userPermissionsSignal().includes(this.requiredPermission as any);

    if (hasPermission) {
      if (this.viewContainer.length === 0) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
      return;
    }

    this.viewContainer.clear();
  }
}
