import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Categorie } from 'src/app/models/Categorie';
import { UploadService } from 'src/app/services/upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorie-form',
  templateUrl: './categorie-form.component.html'
})
export class CategorieFormComponent implements OnInit {
  @Input() initialData: Categorie  | null = null;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<Categorie>();

  form!: FormGroup;
  isEditMode = false;
  image : string | null = null;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder,
    private uploadService : UploadService
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.initialData;
    this.form = this.fb.group({
      Titre: [this.initialData?.Titre || ''],
      Description: [this.initialData?.Description || ''],
      image: [this.initialData?.image || '']
    });
  }

  submit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      if (this.isEditMode) formValue.id = this.initialData?.id;
      this.onSave.emit(formValue);
    }
  }

  close(): void {
    this.onClose.emit();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      this.uploadService.uploadImage(this.selectedFile).subscribe({
        next: res => {
          this.image = res.secure_url;
          this.form.patchValue({ image: this.image }); // ← formControlName="image"
          console.log('Image uploaded:', res.secure_url);
        },
        error: err => {
          console.error('Erreur upload Cloudinary:', err);
          Swal.fire('Erreur', 'Échec de l\'upload de l\'image', 'error');
        }
      });
    }
  }
}
