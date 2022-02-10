import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {

  private _employeeId: number = 0;
  private _isLoggedIn = new BehaviorSubject<boolean>(false); // _isLoggedIn : Une propriété privée de type BehaviorSubject. initialisé à false, ce qui signifie que l'utilisateur n'est pas connecté au départ.
  public isLoggedIn = this._isLoggedIn.asObservable();
  /*
  Cette méthode transforme _isLoggedIn en un observable (à travers la propriété publique isLoggedIn), 
  permettant à d'autres composants ou services de s'abonner et de recevoir des mises à jour sur l'état de connexion.   
  */

  constructor() { }

  get employeeId() {
    return this._employeeId;
  }

  set employeeId(id: number) {
    this._employeeId = id;
  }

  hideLogin() {
    this._isLoggedIn.next(true);
  }

  showLogin() {
    this._isLoggedIn.next(false);
  }
}
// Ces méthodes sont utilisées pour mettre à jour l'état de connexion de l'utilisateur.

/* 

Résumé
Le service DataManagementService :

Gère l'état de connexion de l'utilisateur avec _isLoggedIn (via un BehaviorSubject).
Permet de lire et d'écrire l'ID de l'employé via des getter et setter.
Fournit des méthodes hideLogin() et showLogin() pour mettre à jour l'état de connexion.
Expose l'état de connexion sous forme d'observable (isLoggedIn), permettant à d'autres parties de l'application de réagir aux changements d'état de connexion.
*/