import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'expressFront';
  constructor(private router: Router, private authService: AuthService) {}

  isLoginOrRegisterPage(): boolean {
    const currentUrl = this.router.url;
    return currentUrl.includes('/login') || currentUrl.includes('/register');
  }

  isAdmin(): boolean {
    return this.authService.isLoggedIn() && this.authService.getUserRole() === 'admin';
  }

  isClientOrPro(): boolean {
    const role = this.authService.getUserRole();
    return this.authService.isLoggedIn() && (role === 'client' || role === 'professionnel');
  }
}
