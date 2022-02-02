import {AfterViewInit, Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {Observable} from "rxjs";
import {Employee} from "../../Models/employee";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-employee-list-page',
  templateUrl: './employee-list-page.component.html',
  styleUrls: ['./employee-list-page.component.css']
})
export class EmployeeListPageComponent implements OnInit, AfterViewInit {
  employees: Employee[];

  constructor(private employeeService: EmployeeService, private loginService: LoginService) {


  }

  async initialize() {
    await this.loginService.login('user','test');
    this.employeeService.getEmployees();
    this.employeeService.employees$.subscribe(employees => this.employees = employees);
  }

  ngOnInit(): void {
  };

  ngAfterViewInit(): void {
    this.initialize();
  }

  fillEmployees() {

  }

  deleteEmployee() {

  }

  addEmployee() {

  }

  showDetailsEmployee() {

  }


}
