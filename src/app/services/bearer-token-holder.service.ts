import { Injectable } from '@angular/core';

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
