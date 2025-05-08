import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categorie } from 'src/app/models/Categorie';
import { Service } from 'src/app/models/Service';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.css']
})
export class ServiceFormComponent implements OnInit {
  @Input() initialData: Service | null = null;
  @Input() categories: Categorie[] = [];

  @Output() onSave = new EventEmitter<Service>();
  @Output() onClose = new EventEmitter<void>();

  form!: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isEditMode = !!this.initialData;
    this.form = this.fb.group({
      Titre: [this.initialData?.Titre || '', Validators.required],
      Description: [this.initialData?.Description || '', Validators.required],
      categorieId: [this.initialData?.categorie?.id || '', Validators.required],
    });
  }

  submit(): void {
    if (this.form.valid) {
      const service: Service = {
        id: this.initialData?.id || 0,
        Titre: this.form.value.Titre,
        Description: this.form.value.Description,
        categorie_id: Number(this.form.value.categorieId), // champ attendu par l'API
      };

      this.onSave.emit(service);
    }
  }


  close(): void {
    this.onClose.emit();
  }
}
