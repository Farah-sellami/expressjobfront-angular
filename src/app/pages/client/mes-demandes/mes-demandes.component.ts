import { Component, OnInit } from '@angular/core';
import { DemandeService } from 'src/app/models/DemandeService';
import { AuthService } from 'src/app/services/auth.service';
import { DemandeServiceService } from 'src/app/services/demande.service';

@Component({
  selector: 'app-mes-demandes',
  templateUrl: './mes-demandes.component.html',
  styleUrls: ['./mes-demandes.component.css']
})
export class MesDemandesComponent implements OnInit {
  demandes: DemandeService[] = [];
  p: number = 1; // Page courante
  itemsPerPage: number = 5; // Nombre d'items par page

  constructor(
    private demandeService: DemandeServiceService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadDemandes();
  }

  loadDemandes(): void {
    const clientId = this.authService.getCurrentUser()?.id;
    if (clientId) {
      this.demandeService.getDemandesByClient(clientId).subscribe({
        next: (data) => {
          this.demandes = data;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des demandes:', err);
        }
      });
    }
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'en_attente': return 'badge bg-warning';
      case 'accepté': return 'badge bg-success';
      case 'refusé': return 'badge bg-danger';
      case 'terminé': return 'badge bg-info';
      default: return 'badge bg-secondary';
    }
  }
}
