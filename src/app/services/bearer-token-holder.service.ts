import { Injectable } from '@angular/core';
// Le décorateur @Injectable indique que ce service peut être injecté dans d'autres parties de l'application.
@Injectable({
  providedIn: 'root'
})
export class BearerTokenHolderService {


  private _bearerToken: string;

  constructor() { }


  get bearerToken(): string {
    return this._bearerToken;
  }

  set bearerToken(value) {
    this._bearerToken = value;
  }
}
/*
Le service BearerTokenHolderService :

Permet de stocker et gérer le token Bearer.
Utilise un getter et un setter pour accéder et mettre à jour le token.
Est marqué avec @Injectable, ce qui le rend accessible partout dans l'application Angular.
*/