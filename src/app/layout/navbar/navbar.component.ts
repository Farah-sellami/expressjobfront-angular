import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public authService: AuthService, private router: Router) {}

  isAuthenticated(): boolean {
    return this.authService.isLoggedIn(); // méthode à créer dans AuthService si pas encore faite
  }

  logout() {
    this.authService.logout();
    // Supprimer le token et les infos utilisateur du stockage local
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/login']);
  }

}
