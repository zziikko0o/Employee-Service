import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {

  private _employeeId: number = 0;
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn = this._isLoggedIn.asObservable();

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
