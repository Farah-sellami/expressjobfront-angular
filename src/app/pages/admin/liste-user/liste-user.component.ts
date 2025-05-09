import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-liste-user',
  templateUrl: './liste-user.component.html',
  styleUrls: ['./liste-user.component.css']
})
export class ListeUserComponent implements OnInit {
  users: User[] = [];           // Liste des utilisateurs à afficher
  isLoading = true;             // Pour gérer le chargement
  error: string | null = null;  // Message d'erreur

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchAllUsers();
  }

  fetchAllUsers(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        console.log('Utilisateurs récupérés:', data);
        this.users = data;         // Stocker tous les utilisateurs
        this.isLoading = false;    // Fin du chargement
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des utilisateurs';
        console.error(err);
        this.isLoading = false;    // Fin du chargement
      }
    });
  }
}
