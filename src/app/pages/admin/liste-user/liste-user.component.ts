import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-liste-user',
  templateUrl: './liste-user.component.html',
  styleUrls: ['./liste-user.component.css']
})
export class ListeUserComponent implements OnInit {
  users: User[] = []; // Liste des utilisateurs
  isLoading = true;    // Pour gérer le chargement
  error: string | null = null; // Message d'erreur
  selectedRole: string = '';  // Rôle sélectionné pour le filtrage

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchAllUsers();
  }

  // Récupérer tous les utilisateurs
  fetchAllUsers(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        console.log('Réponse API:', data);
        // Si data est un objet unique, le mettre dans un tableau
        this.users = Array.isArray(data) ? data : [data];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur API:', err);
        this.error = 'Erreur lors du chargement des utilisateurs.';
        this.isLoading = false;
      }
    });
  }

  // Appliquer les filtres sur les utilisateurs
  applyFilters(): void {
    if (this.selectedRole) {
      this.users = this.users.filter(u => u.role === this.selectedRole);
    }
  }

  // Filtrer par rôle
  onRoleChange(event: any): void {
    this.selectedRole = event.target.value;
    this.applyFilters();
  }
}
