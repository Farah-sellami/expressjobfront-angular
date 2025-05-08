import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // Connexion
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials);
  }

  // Inscription
  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  // Déconnexion
  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {});
  }

  // Rafraîchir le token
  refresh(): Observable<any> {
    return this.http.post(`${this.baseUrl}/refresh`, {});
  }

  // Profil utilisateur
  getUserProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user`);
  }

  // Vérifier l'email
  verifyEmail(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/verify-email/${email}`);
  }

  getUserRole(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    try {
      const userData = localStorage.getItem('user');
      if (!userData) return null;

      const user = JSON.parse(userData);
      return user && user.id ? user : null;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      return null;
    }
  }
}
