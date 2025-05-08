import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';


//Ton JwtInterceptor sert à intercepter toutes les requêtes HTTP sortantes pour y ajouter automatiquement le token JWT dans les headers si l'utilisateur est connecté.
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

      // Ne rien faire si la requête est vers Cloudinary
      if (request.url.includes('cloudinary.com')) {
        return next.handle(request);
      }
      
    // Récupérer le jeton JWT depuis le localStorage
    const token = localStorage.getItem('token');

    // Cloner la requête et ajouter le jeton JWT aux en-têtes
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
  }
}

// @Injectable() : Décore la classe pour qu'elle puisse être injectée comme dépendance.
// HttpInterceptor : Interface qui doit être implémentée pour créer un intercepteur.
// intercept : Méthode qui intercepte les requêtes HTTP. Actuellement, elle passe simplement la requête au prochain gestionnaire sans modification.
