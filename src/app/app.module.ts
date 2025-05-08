import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './services/jwt.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HomeComponent } from './pages/shared/home/home.component';
import { ContactComponent } from './pages/shared/contact/contact.component';
import { AdminNavbarComponent } from './layout/admin-navbar/admin-navbar.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ListeUserComponent } from './pages/admin/liste-user/liste-user.component';
import { UnauthorizedComponent } from './pages/shared/unauthorized/unauthorized.component';
import { FooterAdminComponent } from './layout/footer-admin/footer-admin.component';
import { ListeServiceComponent } from './pages/admin/service/liste-service/liste-service.component';
import { ListDemandeSerComponent } from './pages/admin/list-demande-ser/list-demande-ser.component';
import { ProfileComponent } from './pages/shared/profile/profile.component';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from './pages/admin/confirm-dialog/confirm-dialog.component';
import { CategorieFormComponent } from './pages/admin/categorie/categorie-form/categorie-form.component';
import { ListeCategoriesComponent } from './pages/admin/categorie/liste-categories/liste-categories.component';
import { CommonModule } from '@angular/common';
import { ServiceFormComponent } from './pages/admin/service/service-form/service-form.component';
import { AvisComponent } from './pages/shared/avis/avis.component';
import { ServiceClientComponent } from './pages/client/service-client/service-client.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListProComponent } from './pages/client/list-pro/list-pro.component';
import { MesDemandesComponent } from './pages/client/mes-demandes/mes-demandes.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ContactComponent,
    FooterComponent,
    NavbarComponent,
    AdminNavbarComponent,
    DashboardComponent,
    ListeUserComponent,
    ListeServiceComponent,
    UnauthorizedComponent,
    FooterAdminComponent,
    ListeServiceComponent,
    ListDemandeSerComponent,
    ListeCategoriesComponent,
    ProfileComponent,
    ConfirmDialogComponent,
    CategorieFormComponent,
    ServiceFormComponent,
    AvisComponent,
    ServiceClientComponent,
    ListProComponent,
    MesDemandesComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbPagination,
    NgxPaginationModule,
  ],


   providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
      bootstrap: [AppComponent]
})
export class AppModule { }
