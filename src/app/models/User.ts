import { Service } from "./Service";

export class User {
  id!: number;
  name!: string;
  email!: string;
  password?: string;
  password_confirmation!: string;
  role!: 'admin' | 'professionnel' | 'client';
  isActive!: boolean;
  avatar?: string;
  telephone?: string;
  adresse?: string;
  competence?: string;
  available_hours?: string;
  note_moyenne?: number;
  location?: string;
  service_id?: number;
  last_connection?: string;
  email_verified_at?: string;
  created_at?: string;
  updated_at?: string;

  // Relations
  service?: Service;
  servicesReçus?: any[]; // tu peux créer un modèle DemandeService si besoin
  servicesDemandés?: any[];
  avis?: any[];

}
