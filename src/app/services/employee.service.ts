import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Employee} from "../Models/employee";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {BearerTokenHolderService} from "./bearer-token-holder.service";
import {Qualification} from "../Models/qualification";
import {GetEmployeeQualificationDto} from "../Models/getEmployeeQualificationDto";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  private employees: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);
  public employees$: Observable<Employee[]> = this.employees.asObservable();

  constructor(private http: HttpClient, private bearerTokenHolder: BearerTokenHolderService) {
    //this.getEmployees();
  }

  getEmployees() {
    this.http.get<Employee[]>('/backend', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearerTokenHolder.bearerToken}`)
    }).subscribe(employees => this.employees.next(employees));
  }

  async createEmployee(employee: Employee, qualifications: Qualification[]) {
    let e = await this.http.post<Employee>('/backend',employee,{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearerTokenHolder.bearerToken}`)
    }).toPromise().catch((err: HttpErrorResponse) => {
      throw err;
    });

    for (const q of qualifications) {
     await this.addEmployeeQualification(e.id, q);
    }

  }

  async addEmployeeQualification(eId: number, qualification: Qualification) {
    await this.http.post('/addQualification/'+ eId + '/qualifications', qualification, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearerTokenHolder.bearerToken}`)
    }).toPromise();
  }

  async removeEmployeeQualification(eId: number, qualification: Qualification) {
    await this.http.request('delete','/backend/' + eId + '/qualifications', {
      body: qualification,
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearerTokenHolder.bearerToken}`)
    }).toPromise();
  }

  async deleteEmployee(id: number) {
    await this.http.delete('/backend/' + id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearerTokenHolder.bearerToken}`)
    }).toPromise();
  }

  async getEmployeeQualifications(id: number): Promise<Qualification[]> {
    let response = await this.http.get<GetEmployeeQualificationDto>('/backend/' + id + '/qualifications', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearerTokenHolder.bearerToken}`)
    }).toPromise();

    return response.skillSet;
  }


  getEmployee(id: number): Employee{

    for(const e of this.employees.value) {
      if(e.id === id) {
        return e;
      }
    }
    return new Employee();
  }

  async updateEmployee(employee: Employee) {
    await this.http.put('/backend' + employee.id, {
      "lastName":employee.lastName,
      "firstName":employee.firstName,
      "street":employee.street,
      "postcode":employee.postcode,
      "city":employee.city,
      "phone":employee.phone
    },
    {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearerTokenHolder.bearerToken}`)
    }
      ).toPromise();
  }

}
