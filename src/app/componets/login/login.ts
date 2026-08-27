import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  loginError = '';

  constructor(private auth: AuthService, private router: Router) { }
  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const { email, password } = this.form.value;
    if (this.auth.login(email!, password!)) {
      this.loginError = '';
      this.router.navigateByUrl('/home');
    } else {
      this.loginError = 'بيانات الدخول غير صحيحة';
    }
  }
}
