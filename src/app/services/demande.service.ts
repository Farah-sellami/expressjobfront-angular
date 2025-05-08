import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DemandeService } from '../models/DemandeService';
import { environment } from 'src/environment';

// Modèle de la demande de service (selon le modèle DemandeService.ts que nous avons créé précédemment)

@Injectable({
  providedIn: 'root',
})
export class DemandeServiceService {
  private baseUrl = `${environment.baseUrl}/demandes`; // URL de base pour les demandes

  constructor(private http: HttpClient) {}

  // Envoi d'une demande de service (POST)
// service: DemandeServiceService.ts
envoyerDemande(demande: DemandeService): Observable<DemandeService> {
  return this.http.post<DemandeService>(`${this.baseUrl}/envoyer`, demande);
}


  // Changer le statut d'une demande (PUT)
  changerStatutDemande(demandeId: number, nouveauStatut: 'en_attente' | 'terminé' | 'annulé'): Observable<DemandeService> {
    return this.http.put<DemandeService>(`${this.baseUrl}/${demandeId}/statut/${nouveauStatut}`, {});
  }

  // Consulter les demandes de service (GET)
  consulterDemandes(): Observable<{ demandes: DemandeService[] }> {
    return this.http.get<{ demandes: DemandeService[] }>(`${this.baseUrl}`);
  }


  // Récupérer les notifications (GET)
  getNotifications(): Observable<DemandeService> {
    return this.http.get<DemandeService>(`${environment.baseUrl}/notifications`);
  }
  getDemandesByClient(clientId: number): Observable<DemandeService[]> {
    return this.http.get<DemandeService[]>(`${this.baseUrl}/client/${clientId}`);
  }
}
