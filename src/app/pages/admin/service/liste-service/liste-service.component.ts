import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/models/Categorie';
import { Service } from 'src/app/models/Service';
import { User } from 'src/app/models/User';
import { CategorieService } from 'src/app/services/categorie.service';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-liste-service',
  templateUrl: './liste-service.component.html',
  styleUrls: ['./liste-service.component.css']
})
export class ListeServiceComponent implements OnInit {
  services: Service[] = [];
  loading = true;
  error: string | null = null;

  // Pagination
  currentPage = 0;
  servicesPerPage = 5;

  // Catégories
  categories: Categorie[] = [];
  selectedCategorie: string = '';

  // Modals
  showModal = false;
  showProfessionalModal = false;
  selectedService: Service | null = null;
  professionals: User[] = [];
  showServiceForm = false;

  showConfirm = false;

  constructor(
    private router: Router,
    private categorieService: CategorieService,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchServices();
  }
  get totalPages(): number {
    return Math.ceil(this.services.length / this.servicesPerPage);
  }

  get currentServices() {
    const start = this.currentPage * this.servicesPerPage;
    return this.services.slice(start, start + this.servicesPerPage);
  }

  paginate(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
    }
  }



  fetchCategories(): void {
    this.categorieService.getCategories().subscribe({
      next: (data: Categorie[]) => {
        this.categories = data;
      },
      error: () => {
        this.error = 'Erreur lors du chargement des catégories';
      }
    });
  }

  fetchServices(): void {
    this.loading = true;
    const categorieId = Number(this.selectedCategorie);
  const observable = categorieId
    ? this.serviceService.getServicesByCategory(categorieId)
    : this.serviceService.getAllServices();

  observable.subscribe({
    next: (data: Service[]) => {
      this.services = data;
      this.loading = false;
    },
    error: () => {
      this.error = 'Erreur lors du chargement des services';
      this.loading = false;
    }
  });
}


  onChangeCategorie(CategorieId: string): void {
    console.log('Catégorie sélectionnée :', CategorieId);
    this.selectedCategorie = CategorieId;
    this.currentPage = 0; // index de page en base 0
    this.fetchServices();
  }



  onEditService(id: number): void {
    this.router.navigate([`/ModifierService/${id}`]);
  }

  onDeleteClick(service: Service): void {
    this.selectedService = service;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedService = null;
  }



  onShowProfessionals(service: Service): void {
    this.selectedService = service;
    this.serviceService.getProfessionalsByService(service.id).subscribe({
      next: (data: User[]) => {
        this.professionals = data;
        this.showProfessionalModal = true;
      },
      error: () => {
        alert("Impossible de récupérer les professionnels.");
      }
    });
  }


  openAddService(): void {
    this.selectedService = null;
    this.showServiceForm = true;
  }

  openEditService(service: Service): void {
    this.selectedService = service;
    this.showServiceForm = true;
  }

  handleSave(service: Service): void {
    if (service.id) {
      // update
      this.serviceService.updateService(service.id, service).subscribe(() => {
        Swal.fire('Succès', 'Service mis à jour avec succès', 'success');
        this.fetchServices(); // reload list
        this.showServiceForm = false;
      });
    } else {
      // create
      this.serviceService.createService(service).subscribe(() => {
        Swal.fire('Succès', 'Service ajouté avec succès', 'success');
        this.fetchServices(); // reload list
        this.showServiceForm = false;
      });
    }
  }

    // Ouvre le modal avec la catégorie sélectionnée
  openConfirm(service: Service): void {
    this.selectedService = service;
    this.showConfirm = true;
    console.log('showConfirm:', this.showConfirm);
  }

  // Si l'utilisateur confirme
  confirmDelete(): void {
    if (!this.selectedService) return;

    this.serviceService.deleteService(this.selectedService.id).subscribe({
      next: () => {
        // On filtre pour retirer le service supprimé de la liste
        this.services = this.services.filter(s => s.id !== this.selectedService!.id);
        Swal.fire('Succès', 'Service supprimé avec succès !', 'success');
        this.resetConfirm(); // Ferme le modal et réinitialise l'état
      },
      error: () => {
        Swal.fire('Erreur', 'Échec lors de la suppression du service.', 'error');
        this.resetConfirm();
      }
    });
  }


  // Si l'utilisateur annule
  cancelDelete(): void {
    this.resetConfirm();
  }

  // Réinitialisation des valeurs du modal
  private resetConfirm(): void {
    this.selectedService = null;
    this.showConfirm = false;
  }

}
