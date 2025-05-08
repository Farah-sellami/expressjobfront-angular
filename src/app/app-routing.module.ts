import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HomeComponent } from './pages/shared/home/home.component';
import { ContactComponent } from './pages/shared/contact/contact.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ListeUserComponent } from './pages/admin/liste-user/liste-user.component';
import { UnauthorizedComponent } from './pages/shared/unauthorized/unauthorized.component';
import { RoleGuard } from './services/guards/role.guard';
import { AuthGuard } from './services/guards/auth.guard';
import { ListeServiceComponent } from './pages/admin/service/liste-service/liste-service.component';
import { ListDemandeSerComponent } from './pages/admin/list-demande-ser/list-demande-ser.component';
import { ProfileComponent } from './pages/shared/profile/profile.component';
import { ListeCategoriesComponent } from './pages/admin/categorie/liste-categories/liste-categories.component';
import { ServiceClientComponent } from './pages/client/service-client/service-client.component';
import { ListProComponent } from './pages/client/list-pro/list-pro.component';
import { MesDemandesComponent } from './pages/client/mes-demandes/mes-demandes.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'admin' } },
  { path: 'listCategories', component: ListeCategoriesComponent , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'admin' } },
  { path: 'listServices', component: ListeServiceComponent , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'admin' } },
  { path: 'listUsers', component: ListeUserComponent , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'admin' } },
  { path: 'listDemandeService', component: ListDemandeSerComponent , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'admin' } },
  { path: 'services', component: ServiceClientComponent },
  { path: 'professionnels/:serviceId', component: ListProComponent },
  { path: 'mes-demandes', component: MesDemandesComponent , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'client' } },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: 'login' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
