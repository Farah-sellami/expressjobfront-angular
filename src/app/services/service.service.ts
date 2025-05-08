import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { DemandeService } from '../models/DemandeService';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private baseUrl = `${environment.baseUrl}/services`;

  constructor(private http: HttpClient) {}

  // Méthode pour obtenir tous les services
  getAllServices(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  // Méthode pour obtenir un service par ID
  getServiceById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Méthode pour obtenir les services d'une catégorie
  getServicesByCategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/category/${categoryId}`);
  }

  // Méthode pour ajouter un service (requiert un admin)
  createService(serviceData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, serviceData);
  }

  // Méthode pour modifier un service (requiert un admin)
  updateService(id: number, serviceData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, serviceData);
  }

  // Méthode pour supprimer un service (requiert un admin)
  deleteService(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Méthode pour obtenir les professionnels associés à un service
  getProfessionalsByService(serviceId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${serviceId}/professionnels`);
  }

  getDemandesByClient(clientId: number): Observable<DemandeService[]> {
    return this.http.get<DemandeService[]>(`${this.baseUrl}/demandes/client/${clientId}`);
  }

}
