import { Service } from "./Service";

export class Categorie {
  id!: number;
  Titre!: string;
  Description?: string; // nullable
  image?: string; // nullable
  created_at?: string;
  updated_at?: string;

  // Relations
  services?: Service[];

  constructor(data?: Partial<Categorie>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
