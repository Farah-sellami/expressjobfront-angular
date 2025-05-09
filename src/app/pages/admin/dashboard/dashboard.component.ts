import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
//   countProfessionnels: number = 0;  // Compteur de professionnels
//   countClients: number = 0;        // Compteur de clients

//   constructor(private userService: UserService) {}

//   ngOnInit(): void {
//     this.getProfessionnelsCount();
//     this.getClientsCount();
//   }

//  // Méthode pour récupérer le nombre de professionnels
//  getProfessionnelsCount(): void {
//   this.userService.countProfessionnels().subscribe({
//     next: (data) => {
//       console.log('Réponse professionnels:', data);
//       this.countProfessionnels = data;  // Assurez-vous que c'est bien 'count_professionnels' dans la réponse
//     },
//     error: (err) => {
//       console.error('Erreur lors du chargement du nombre de professionnels', err);
//     }
//   });
// }

// // Méthode pour récupérer le nombre de clients
// getClientsCount(): void {
//   this.userService.countClients().subscribe({
//     next: (data) => {
//       console.log('Réponse client:', data);
//       this.countClients = data;  // Assurez-vous que c'est bien 'count_clients' dans la réponse
//     },
//     error: (err) => {
//       console.error('Erreur lors du chargement du nombre de clients', err);
//     }
//   });
// }

countProfessionnels: number = 0;
countClients: number = 0;
allUsers: User[] = [];

constructor(private userService: UserService) {}

ngOnInit(): void {
  this.loadAndCountUsers();
}

loadAndCountUsers(): void {
  this.userService.getAllUsers().subscribe({
    next: (users) => {
      this.allUsers = users;
      this.countClients = users.filter(u => u.role === 'client').length;
      this.countProfessionnels = users.filter(u => u.role === 'professionnel').length;
    },
    error: (err) => {
      console.error('Erreur lors du chargement des utilisateurs', err);
    }
  });
}
}

