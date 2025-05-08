import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { Categorie } from '../models/Categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private apiUrl = `${environment.baseUrl}/categories`;  // URL de l'API pour les catégories

  constructor(private http: HttpClient) {}

  // Récupérer toutes les catégories
  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.apiUrl);
  }

  // Récupérer une catégorie spécifique
  getCategorie(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.apiUrl}/${id}`);
  }

  // Créer une nouvelle catégorie (accessible seulement par un admin)
  createCategorie(data: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.apiUrl, data);
  }

  // Mettre à jour une catégorie (accessible seulement par un admin)
  updateCategorie(id: number, data: Categorie): Observable<Categorie> {
    return this.http.put<Categorie>(`${this.apiUrl}/${id}`, data);
  }

  // Supprimer une catégorie (accessible seulement par un admin)
  deleteCategorie(id: number): Observable<Categorie> {
    return this.http.delete<Categorie>(`${this.apiUrl}/${id}`);
  }
}
