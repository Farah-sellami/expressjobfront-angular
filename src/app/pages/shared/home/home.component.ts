import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/models/Categorie';
import { Service } from 'src/app/models/Service';
import { CategorieService } from 'src/app/services/categorie.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: Categorie[] = [];

  constructor(private categorieService: CategorieService , private router: Router) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categorieService.getCategories().subscribe(
      (data) => {
        this.categories =  data.slice(0, 4);
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories :', error);
      }
    );
  }
  searchTerm: string = '';

  onSearch(event: Event) {
    event.preventDefault();
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchTerm } });
    }
  }
  goToDemandeService(): void {
    this.router.navigate(['/services']);
  }
}
