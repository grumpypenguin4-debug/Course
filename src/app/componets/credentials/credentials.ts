import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface GoogleWorkspaceCredential {
  title: string;
  category: string;
  email: string;
  password: string;
  domain: string;
  adminEmail: string;
  phone?: string;
  recoveryEmail?: string;
  icon: string;
  iconBg: string;
  accentColor?: string;
  strengthScore: number;
  strengthText: string;
  strengthColor: string;
}

@Component({
  selector: 'app-credentials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './credentials.html',
  styleUrl: './credentials.scss',
})
export class Credentials implements OnInit {
  router = inject(Router);

  credential: GoogleWorkspaceCredential | null = null;
  showPassword = false;

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['entry']) {
      this.credential = navigation.extras.state['entry'] as GoogleWorkspaceCredential;
    } else {
      this.credential = {
        title: 'Google Workspace',
        category: 'Work',
        email: 'admin@yourdomain.com',
        password: 'YourPassword123!',
        domain: 'yourdomain.com',
        adminEmail: 'admin@yourdomain.com',
        phone: '+1 234 567 890',
        recoveryEmail: 'recovery@yourdomain.com',
        icon: 'fa-solid fa-cloud',
        iconBg: 'var(--color-card-bg)',
        accentColor: 'var(--color-accent-green)',
        strengthScore: 2,
        strengthText: 'Weak',
        strengthColor: 'var(--color-tertiary)',
      };
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  copyPassword(password: string): void {
    navigator.clipboard.writeText(password).then(() => {
      console.log('Password copied to clipboard');
    });
  }

  goBack(): void {
    this.router.navigate(['/vault']);
  }
}
