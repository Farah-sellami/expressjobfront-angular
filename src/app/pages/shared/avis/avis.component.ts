import { Component } from '@angular/core';

@Component({
  selector: 'app-avis',
  templateUrl: './avis.component.html',
  styleUrls: ['./avis.component.css']
})
export class AvisComponent {
  testimonials = [
    {
      name: 'Marie Dupont',
      role: 'Propriétaire',
      image: 'assets/marie.jpg',
      rating: 5,
      message: "J'ai trouvé un plombier exceptionnel en moins d'une heure. Le service était rapide, professionnel et abordable."
    },
    {
      name: 'Thomas Bernard',
      role: 'Entrepreneur',
      image: 'assets/thomas.jpg',
      rating: 5,
      message: "Express Job m'a permis de trouver des professionnels fiables pour la rénovation complète de mon bureau."
    },
    {
      name: 'Sophie Martin',
      role: 'Décoratrice',
      image: 'assets/sophie.jpg',
      rating: 5,
      message: "La qualité des prestataires sur cette plateforme est remarquable. Je la recommande à tous mes clients."
    }
  ];
}

