import { Component, OnInit } from '@angular/core';
import { DemandeServiceService } from 'src/app/services/demande.service';

@Component({
  selector: 'app-list-demande-ser',
  templateUrl: './list-demande-ser.component.html',
  styleUrls: ['./list-demande-ser.component.css']
})
export class ListDemandeSerComponent implements OnInit {

  demandeservices: any[] = [];
  currentPage: number = 0;
  demandeservicesPerPage: number = 6;
  currentDemandeservices: any[] = [];

  constructor(private demandeService: DemandeServiceService) { }

  ngOnInit(): void {
    this.fetchDemandeservices();
  }

  fetchDemandeservices(): void {
    this.demandeService.consulterDemandes().subscribe({
      next: (data) => {
        console.log("Données reçues :", data);
        this.demandeservices = data.demandes;
        this.updateCurrentDemandes();
      },
      error: (err) => {
        console.error("Erreur lors du chargement des demandes services :", err);
      }
    });
  }


  updateCurrentDemandes(): void {
    const offset = this.currentPage * this.demandeservicesPerPage;
    this.currentDemandeservices = this.demandeservices.slice(offset, offset + this.demandeservicesPerPage);
  }

  handlePageChange(event: number): void {
    this.currentPage = event;
    this.updateCurrentDemandes();
  }

  get pageCount(): number {
    return Math.ceil(this.demandeservices.length / this.demandeservicesPerPage);
  }

}
