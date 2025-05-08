import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/models/Categorie';
import { CategorieService } from 'src/app/services/categorie.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service-client',
  templateUrl: './service-client.component.html',
  styleUrls: ['./service-client.component.css']
})
export class ServiceClientComponent implements OnInit {
  categories: Categorie[] = [];
  p: number = 1;

  constructor(private categorieService: CategorieService ,
    private serviceService: ServiceService
    , private router: Router) {}

    ngOnInit(): void {
      this.getCategoriesWithServices();
    }

    getCategoriesWithServices(): void {
      this.categorieService.getCategories().subscribe(
        (categories) => {
          this.categories = categories;

          // Charger les services pour chaque catégorie
          this.categories.forEach((categorie) => {
            this.serviceService.getServicesByCategory(categorie.id).subscribe(
              (services) => {
                categorie.services = services;
              },
              (error) => {
                console.error(`Erreur lors de la récupération des services pour la catégorie ${categorie.id}`, error);
                categorie.services = [];
              }
            );
          });
        },
        (error) => {
          console.error('Erreur lors de la récupération des catégories :', error);
        }
      );
    }


    navigateToProfessionals(serviceId: number): void {
      this.router.navigate(['/professionnels', serviceId]);
  }

}
