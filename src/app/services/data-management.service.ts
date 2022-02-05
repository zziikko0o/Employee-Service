import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {

  private _employeeId: number = 0;

  constructor() { }

  get employeeId() {
    return this._employeeId;
  }

  set employeeId(id: number) {
    this._employeeId = id;
  }

}
