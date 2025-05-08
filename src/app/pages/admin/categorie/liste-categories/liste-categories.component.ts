import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/models/Categorie';
import { CategorieService } from 'src/app/services/categorie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-categorie',
  templateUrl: './liste-categories.component.html',
})
export class ListeCategoriesComponent implements OnInit {
  categories: Categorie[] = [];
  currentCategories: Categorie[] = [];
  currentPage = 0;
  itemsPerPage = 5;
  totalPages = 0;

  // Modal
  showModal = false;
  selectedCategorie: Categorie | null = null;
  showConfirm = false;

  constructor(private categorieService: CategorieService) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.categorieService.getCategories().subscribe((data: Categorie[]) => {
      this.categories = data;
      this.paginate(0);
    });
  }

  paginate(pageIndex: number): void {
    this.currentPage = pageIndex;
    const start = pageIndex * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.totalPages = Math.ceil(this.categories.length / this.itemsPerPage);
    this.currentCategories = this.categories.slice(start, end);
  }

  openAddModal(): void {
    this.selectedCategorie = null;
    this.showModal = true;
  }

  handleEditCategorie(id: number): void {
    const cat = this.categories.find(c => c.id === id);
    if (cat) {
      this.selectedCategorie = { ...cat };
      this.showModal = true;
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedCategorie = null;
  }

  saveCategorie(categorie: Categorie): void {
    if (categorie.id) {
      // Mode édition
      this.categorieService.updateCategorie(categorie.id, categorie).subscribe({
        next: () => {
          const index = this.categories.findIndex(c => c.id === categorie.id);
          if (index > -1) {
            this.categories[index] = categorie;
          }
          this.paginate(this.currentPage);
          this.closeModal();
          Swal.fire('Succès', 'Catégorie mise à jour avec succès', 'success');
        },
        error: () => {
          Swal.fire('Erreur', 'Échec de la mise à jour de la catégorie', 'error');
        }
      });
    } else {
      // Mode création
      this.categorieService.createCategorie(categorie).subscribe({
        next: (newCat) => {
          this.categories.push(newCat);
          this.paginate(this.currentPage);
          this.closeModal();
          Swal.fire('Succès', 'Catégorie ajoutée avec succès', 'success');
        },
        error: () => {
          Swal.fire('Erreur', 'Échec de l\'ajout de la catégorie', 'error');
        }
      });
    }
  }


  // handleDeleteClick(categorie: Categorie): void {
  //   if (confirm('Supprimer cette catégorie ?')) {
  //     this.categorieService.deleteCategorie(categorie.id).subscribe(() => {
  //       this.categories = this.categories.filter(c => c.id !== categorie.id);
  //       this.paginate(this.currentPage);
  //     });
  //   }
  // }

  // Ouvre le modal avec la catégorie sélectionnée
openConfirm(categorie: Categorie): void {
  this.selectedCategorie = categorie;
  this.showConfirm = true;
}

// Si l'utilisateur confirme
confirmDelete(): void {
  if (!this.selectedCategorie) return;

  this.categorieService.deleteCategorie(this.selectedCategorie.id).subscribe({
    next: () => {
      this.categories = this.categories.filter(c => c.id !== this.selectedCategorie!.id);
      this.paginate(this.currentPage);
      this.resetConfirm();
      Swal.fire('Supprimé !', 'La catégorie a été supprimée avec succès.', 'success');
    },
    error: (err) => {
      console.error('Erreur suppression catégorie:', err);
      this.resetConfirm();
      Swal.fire('Erreur', 'La suppression a échoué.', 'error');
    }
  });
}

// Si l'utilisateur annule
cancelDelete(): void {
  this.resetConfirm();
}

// Réinitialisation des valeurs du modal
private resetConfirm(): void {
  this.selectedCategorie = null;
  this.showConfirm = false;
}
}
