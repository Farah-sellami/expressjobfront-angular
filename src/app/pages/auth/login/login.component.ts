import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      console.warn('Formulaire invalide:', this.loginForm.value);
      return;
    }

    const { email, password } = this.loginForm.value;
    console.log('Tentative de connexion avec:', email);

    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        console.log('Réponse de l\'API:', response);

        if (response.access_token) {
          localStorage.setItem('token', response.access_token);
          this.loadUserProfile();
        } else {
          console.error('Pas de access_token dans la réponse.');
          this.errorMessage = 'Authentication failed.';
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid email or password.';
      }
    });
  }

  private loadUserProfile(): void {
    this.authService.getUserProfile().subscribe({
      next: (user: User) => {
        console.log('Utilisateur connecté:', user);
        localStorage.setItem('user', JSON.stringify(user));
             // Redirection selon le rôle
      switch (user.role) {
        case 'admin':
          this.router.navigate(['/dashboard']);
          break;
        case 'professionnel':
        case 'client':
          this.router.navigate(['/']);
          break;
        default:
          this.router.navigate(['/login']); // Fallback en cas de rôle inconnu
          break;
      }
    },
      error: (error) => {
        console.error('Failed to fetch user profile:', error);
        this.errorMessage = 'Unable to load user profile.';
      }
    });
  }
}
