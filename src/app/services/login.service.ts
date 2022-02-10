import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {BearerTokenHolderService} from "./bearer-token-holder.service";
import {DataManagementService} from "./data-management.service";

@Injectable({
  providedIn: 'root'
})
/*Cela indique que le service sera injecté automatiquement dans toute l'application
 (grâce à providedIn: 'root').
*/
export class LoginService {

  private counter: number = 0;
  //counter : Variable privée pour compter les tentatives de connexion échouées.


  constructor(private httpClient: HttpClient, private bearerTokenHolder: BearerTokenHolderService, private dataService: DataManagementService) { }
/* 
Utilise l'injection de dépendances pour accéder à :
HttpClient : Pour envoyer des requêtes HTTP au serveur d'authentification.
BearerTokenHolderService : Pour stocker le token d'authentification après une connexion réussie.
DataManagementService : Pour gérer l'état de l'application après connexion.

*/
  public async login(username: string, password: string): Promise<string> {
// Methode login
/*
Une méthode publique et asynchrone qui prend en entrée un nom d'utilisateur (username) 
et un mot de passe (password), et retourne une promesse de type string.
Son rôle est de gérer la logique de connexion via un appel API.

*/
    const body = `grant_type=password&client_id=employee-management-service&username=${username}&password=${password}`
    /* 
    Étape 1 : Préparation des données

    Crée une chaîne de requête pour envoyer les informations d'identification 
    au serveur d'authentification via un formulaire URL-encodé.
    */
    const bearerToken =
      await this.httpClient.post<HttpResponse<any>>('http://authproxy.szut.dev',
        body, {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
        }
      ).toPromise().catch((err: HttpErrorResponse) => {
        this.counter++;

        if(this.counter >= 3) {
          return "lock";
        }
        
        return "false";
      })
/*
Utilise HttpClient.post pour envoyer les informations d'identification à l'URL http://authproxy.szut.dev
*/
    if(bearerToken === "false")
    {
      return "false";
    }
    if(bearerToken === "lock") {
      return "lock";
    }
/*
Étape 3 : Vérification des réponses
Si l'API retourne "false" ou "lock", la méthode stoppe ici et renvoie directement la réponse correspondante.

*/
    // @ts-ignore
    this.bearerTokenHolder.bearerToken = bearerToken.access_token;
    this.dataService.hideLogin();
    return "true";
  }

  /*   
  Étape 4 : Gestion d'une connexion réussie
  En cas de succès :
Le token Bearer obtenu (bearerToken.access_token) est stocké dans le service BearerTokenHolderService.
Le formulaire de connexion est masqué en appelant this.dataService.hideLogin().
La méthode retourne "true" pour indiquer le succès.

  */
}



/*

Le service LoginService :

Envoie une requête d'authentification au serveur via une API (avec HttpClient).
Gère les réponses : succès, échec simple ou verrouillage temporaire.
Stocke le token Bearer dans un service dédié (BearerTokenHolderService) en cas de succès.
Masque le formulaire de connexion grâce au service DataManagementService.

*/