import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { DemandeServiceService } from 'src/app/services/demande.service';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';
import { DemandeService } from 'src/app/models/DemandeService';



@Component({
  selector: 'app-list-pro',
  templateUrl: './list-pro.component.html',
  styleUrls: ['./list-pro.component.css']
})
export class ListProComponent implements OnInit {
  professionnels: User[] = [];
  serviceId!: number;
  serviceTitre: string = '';

  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiceService,
    private demandeService: DemandeServiceService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
// Récupérez le paramètre de route au lieu de queryParams
this.serviceId = +this.route.snapshot.paramMap.get('serviceId')!;    this.loadProfessionals();
  }

  loadProfessionals(): void {
    if (this.serviceId) {
      this.serviceService.getProfessionalsByService(this.serviceId).subscribe({
        next: (response) => {
          this.professionnels = response.professionnels;
          this.serviceTitre = response.service?.Titre || '';
        },
        error: (err) => console.error('Erreur chargement professionnels:', err)
      });
    }

  }

  viewProfile(professionalId: number): void {
    console.log('profile du professionnel:', professionalId);

    //this.router.navigate(['/professionnel', professionalId]);
  }

  contactProfessional(professionalId: number): void {
    if (!this.authService.isLoggedIn()) {
      Swal.fire({
        title: 'Connexion requise',
        text: 'Vous devez être connecté pour contacter un professionnel',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Se connecter',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });
      return;
    }

    const user = this.authService.getCurrentUser();
    const clientId = user?.id;

    if (!clientId) {
      Swal.fire('Erreur', 'Impossible de récupérer votre identifiant', 'error');
      return;
    }

    Swal.fire({
      title: 'Envoyer une demande',
      html: `
        <p>Vous êtes sur le point de contacter ce professionnel</p>
        <textarea
          id="message"
          class="swal2-textarea"
          placeholder="Message optionnel (décrivez votre besoin)..."
        ></textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Envoyer la demande',
      cancelButtonText: 'Annuler',
      preConfirm: () => {
        return (document.getElementById('message') as HTMLTextAreaElement).value;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const message = result.value;

        const demande: DemandeService = {
          client_id: clientId,
          professionnel_id: professionalId,
          DateDemande: new Date().toISOString(),
          Statut: 'en_attente',
        };

        Swal.fire({
          title: 'Envoi en cours...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        this.demandeService.envoyerDemande(demande)
          .pipe(finalize(() => Swal.close()))
          .subscribe({
            next: () => {
              Swal.fire({
                title: 'Succès!',
                text: 'Votre demande a été envoyée avec succès',
                icon: 'success',
                confirmButtonText: 'OK'
              }).then(() => {
                this.router.navigate(['/mes-demandes']);
              });
            },
            error: (error) => {
              console.error('Erreur:', error);
              Swal.fire({
                title: 'Erreur',
                text: 'Une erreur est survenue lors de l\'envoi de votre demande',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            }
          });
      }
    });
  }
  }
