import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  user = { name: '', email: '', avatar: '' };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        // Supprimer le token et les infos utilisateur du stockage local
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Redirection vers la page de login
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error('Erreur lors de la déconnexion :', err);
        // Même en cas d’erreur, on nettoie localement
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      }
    });
  }


}
