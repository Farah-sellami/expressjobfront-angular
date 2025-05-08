import { Categorie } from './Categorie';
import { User } from './User';

export class Service {
  id!: number;
  Titre!: string;
  Description?: string;
  DateCreation?: string;
  categorie_id!: number;
  created_at?: string;
  updated_at?: string;

  // Relations
  categorie?: Categorie;
  professionnels?: User[];

}
