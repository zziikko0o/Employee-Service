import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {fromFetch} from "rxjs/fetch";
import {bufferTime, throttleTime, timeout} from "rxjs";
import {BearerTokenHolderService} from "./bearer-token-holder.service";
import {dashCaseToCamelCase} from "@angular/compiler/src/util";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private counter: number = 0;

  constructor(private httpClient: HttpClient, private bearerTokenHolder: BearerTokenHolderService) { }

  public async login(username: string, password: string): Promise<string> {

    const body = `grant_type=password&client_id=employee-management-service&username=${username}&password=${password}`

    //console.log(body)


    const bearerToken =
      await this.httpClient.post<HttpResponse<any>>('http://authproxy.szut.dev',
        body, {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
        }
      ).toPromise().catch((err: HttpErrorResponse) => {
        console.log(err);
        this.counter++;

        if(this.counter >= 3) {
          return "lock";
        }

        return "false";
      })

    if(bearerToken === "false")
    {
      return "false";
    }
    if(bearerToken === "lock") {
      return "lock";
    }

    // @ts-ignore
    this.bearerTokenHolder.bearerToken = bearerToken.access_token

    console.log(this.bearerTokenHolder.bearerToken);

    return "true";
  }
}