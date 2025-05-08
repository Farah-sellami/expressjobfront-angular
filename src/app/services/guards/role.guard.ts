// src/app/guards/role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'] || route.data['expectedRoles'];
    const userRole = this.authService.getUserRole();

    if (this.authService.isLoggedIn() && userRole === expectedRole) {
      return true;
    }

    this.router.navigate(['/unauthorized']); // page à créer
    return false;
  }
}
