import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatIconModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  hidePassword = signal(true);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  loginError = '';

  constructor(private auth: AuthService, private router: Router) { }

  togglePasswordVisibility(event: MouseEvent): void {
    event.preventDefault();
    this.hidePassword.update((value) => !value);
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.getRawValue();

    if (this.auth.login(email ?? '', password ?? '')) {
      this.loginError = '';
      this.router.navigateByUrl('/home');
    } else {
      this.loginError = 'Invalid email or password';
    }
  }
}
