import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DEFAULT_CREDENTIAL, GoogleWorkspaceCredential } from '../../models';


@Component({
  selector: 'app-credentials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './credentials.html',
  styleUrl: './credentials.scss',
})
export class Credentials implements OnInit {
  router = inject(Router);


  credential = signal<GoogleWorkspaceCredential>(DEFAULT_CREDENTIAL);
  showPassword = signal<boolean>(false);

  ngOnInit(): void {
    const stateEntry = window.history.state?.['entry'] as GoogleWorkspaceCredential | undefined;

    if (stateEntry) {
      this.credential.set(stateEntry);
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((value) => !value);
  }

  async copyPassword(password: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(password);

      console.log('Password copied to clipboard');
    } catch (err) {
      console.error('Failed to copy password: ', err);
    }
  }

  goBack(): void {
    this.router.navigate(['/vault']);
  }
}
