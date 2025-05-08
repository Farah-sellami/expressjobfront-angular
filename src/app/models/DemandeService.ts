import { User } from './User';

export class DemandeService {
  client_id!: number;
  professionnel_id!: number;
  DateDemande!: string;
  Statut!: 'en_attente' | 'terminé' | 'annulé'; // Enum strict pour les statuts
  DateExecution?: string;
  created_at?: string;
  updated_at?: string;

  // Relations
  client?: User;
  professionnel?: User;

}
