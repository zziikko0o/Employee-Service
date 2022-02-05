import {AfterViewInit, Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {Observable, publish} from "rxjs";
import {Employee} from "../../Models/employee";
import {LoginService} from "../../services/login.service";
import {DataManagementService} from "../../services/data-management.service";
import {Qualification} from "../../Models/qualification";
import {Q} from "@angular/cdk/keycodes";
import {QualificationService} from "../../services/qualification.service";

@Component({
  selector: 'app-employee-list-page',
  templateUrl: './employee-list-page.component.html',
  styleUrls: ['./employee-list-page.component.css']
})
export class EmployeeListPageComponent implements OnInit, AfterViewInit {
  employees: Employee[] = [];
  shownEmployees: Employee[] = [];
  selectedQualification: Qualification = new Qualification();
  qualifications: Qualification[] = [];

  constructor(private employeeService: EmployeeService,
              private qualificationService: QualificationService,
              private loginService: LoginService,
              private dataService: DataManagementService
  ) {


  }

  async initialize() {
    await this.loginService.login('user','test');
    this.employeeService.getEmployees();
    this.employeeService.employees$.subscribe(employees => {
      this.employees = employees
      this.updateShownEmployees();
    } );
    this.qualificationService.getQualifications();
    this.qualificationService.qualifications$.subscribe(qualifications => this.qualifications = qualifications );
  }

  ngOnInit(): void {

  };

  ngAfterViewInit(): void {
    this.initialize();
  }

  fillEmployees() {

  }

  async deleteEmployee(id: number) {
    await this.employeeService.deleteEmployee(id);
    this.employeeService.getEmployees();
  }

  addEmployee() {

  }


  showEmployeeDetails(id: number) {
    this.dataService.employeeId = id;
  }

  updateShownEmployees() {
    this.shownEmployees = [];
    this.employees.forEach(e => this.shownEmployees.push(e));
  }

  async filterForQualification() {
    this.updateShownEmployees();
    let response = await this.qualificationService.getEmployeesByQualification(this.selectedQualification);
    let ids: number[] = [];
    response.employees.forEach(e => ids.push(e.id));

    this.shownEmployees = this.employees.filter(e => ids.includes(e.id));

  }

}
