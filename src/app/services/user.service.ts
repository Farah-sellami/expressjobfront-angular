import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.baseUrl}/user`;

  constructor(private http: HttpClient) { }

  // Récupérer tous les utilisateurs avec pagination
  // user.service.ts
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/list`);  }



  // Récupérer les utilisateurs par rôle
  getUsersByRole(role: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/usersByRole?role=${role}`);
  }

  // Récupérer le profil de l'utilisateur connecté
  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/show`);
  }

  // Mettre à jour le profil de l'utilisateur
  updateProfile(data: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/profile`, data);
  }

  // Supprimer le profil de l'utilisateur
  deleteProfile(): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/profile`);
  }

  // Compter les professionnels
  countProfessionnels(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/count-professionnels`);
  }

  // Compter les clients
  countClients(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/count-clients`);
  }

  getUsersWithPagination(perPage: number, page: number, role: string | null = null): Observable<any> {
    let url = `${this.apiUrl}?per_page=${perPage}&page=${page}`;
    if (role) {
      url += `&role=${role}`;
    }
    return this.http.get<any>(url);
  }

// user.service.ts
deleteUser(id: number): Observable<User> {
  return this.http.delete<User>(`${this.apiUrl}/${id}`);
}


}
