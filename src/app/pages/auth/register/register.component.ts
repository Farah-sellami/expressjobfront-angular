import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';  // Importer FormGroup et FormBuilder
import { User } from 'src/app/models/User';
import { Service } from 'src/app/models/Service';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;  // Déclarer FormGroup
  services: Service[] = [];
  registrationSuccess: boolean = false;
  errorMessage: string = '';

  cities: string[] = ['Tunis', 'Sfax', 'Sousse', 'Gabès', 'Bizerte', 'Nabeul', 'Kairouan'];

  selectedFile: File | null = null;
  avatar: string = ''; // Valeur récupérée après upload Cloudinary

  constructor(
    private authService: AuthService,
    private serviceService: ServiceService,
    private uploadService: UploadService,
    private router: Router,
    private fb: FormBuilder  // Injecter FormBuilder
  ) {
    // Initialiser le FormGroup
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]],
      avatar: [''],
      telephone: [''],
      adresse: [''],
      location: ['', [Validators.required]],  // Ville (location)
      competence: [''],
      available_hours: [''],
      service_id: [''],
       ////
      startTime: [''],
      endTime: ['']
    });
  }

  ngOnInit(): void {
    // Récupérer la liste des services au chargement
    this.serviceService.getAllServices().subscribe({
      next: (data: Service[]) => {
        this.services = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des services:', err);
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      this.uploadService.uploadImage(this.selectedFile).subscribe({
        next: res => {
          this.avatar = res.secure_url;
          this.registerForm.patchValue({ avatar: this.avatar });
          console.log('Image uploaded:', res.secure_url);
        },
        error: err => {
          console.error('Erreur upload Cloudinary:', err);
          Swal.fire('Erreur', 'Échec de l\'upload de l\'image', 'error');
        }
      });
    }
  }


  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    // Vérification des mots de passe
    if (this.registerForm.value.password !== this.registerForm.value.password_confirmation) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Les mots de passe ne correspondent pas.',
      });
      return;
    }

    // Construction dynamique du champ available_hours
    const startTime = this.registerForm.value.startTime;
    const endTime = this.registerForm.value.endTime;

    if (startTime && endTime) {
      this.registerForm.patchValue({
        available_hours: `${startTime} - ${endTime}`
      });
    }

    const userData: User = this.registerForm.value;

    console.log('Tentative d\'inscription avec :', userData);

    this.authService.register(userData).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Inscription réussie',
          text: 'Bienvenue sur notre plateforme !',
          timer: 2000,
          showConfirmButton: false
        });

        this.registrationSuccess = true;

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        console.error('Erreur lors de l\'inscription :', err);
        const message = err.error?.message || 'Une erreur est survenue lors de l\'inscription.';
        Swal.fire({
          icon: 'error',
          title: 'Échec de l\'inscription',
          text: message
        });
        this.errorMessage = message;
      }
    });
  }
}
