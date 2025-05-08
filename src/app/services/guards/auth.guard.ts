import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

//AuthGuard empêche les utilisateurs non connectés d’accéder à certaines routes protégées.
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;// L’utilisateur est connecté, il peut accéder à la route
    } else {
      this.router.navigate(['/login']); // Sinon, on le redirige vers /login
      return false; // Accès refusé
    }
  }

}

// CanActivate	: Autorise ou bloque l'accès à une route
// CanActivateChild :	Autorise ou bloque l'accès aux routes enfants
