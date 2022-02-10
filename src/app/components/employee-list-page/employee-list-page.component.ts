import {AfterViewInit, Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {Observable, publish} from "rxjs";
import {Employee} from "../../Models/employee";
import {LoginService} from "../../services/login.service";
import {DataManagementService} from "../../services/data-management.service";
import {Qualification} from "../../Models/qualification";
import {Q} from "@angular/cdk/keycodes";
import {QualificationService} from "../../services/qualification.service";
import {faTrash, faTrashAlt} from "@fortawesome/free-solid-svg-icons";


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

  searchParameter: string = '';

  faTrashCan = faTrashAlt;

  constructor(private employeeService: EmployeeService,
              private qualificationService: QualificationService,
              private loginService: LoginService,
              private dataService: DataManagementService
  ) {
      this.dataService.isLoggedIn.subscribe(s => {
        if(s) {
          this.initialize();
        }
      })

  }

  async initialize() {
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
    //this.initialize();
  }

  fillEmployees() {

  }

  async deleteEmployee(event: MouseEvent ,id: number) {
    event.stopPropagation();
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

  refreshSearch() {
    this.shownEmployees = this.employees.filter(e => this.includesSearchParameter(e))
  }

  sortEmployees(element: string) {

    switch (element) {
      case "id":
        this.shownEmployees.sort((a, b) => {
          return a.id - b.id;
        });
        break;
      case "firstname":
        this.shownEmployees.sort((a, b) => {
          if(a.firstName.toLowerCase()<b.firstName.toLowerCase()) {
            return -1;
          }
          return 1;
        });
        break;
      case "lastname":
        this.shownEmployees.sort((a, b) => {
          if(a.lastName.toLowerCase()<b.lastName.toLowerCase()) {
            return -1;
          }
          return 1;
        });
        break;
      case "street":
        this.shownEmployees.sort((a, b) => {
          if(a.street.toLowerCase()<b.street.toLowerCase()) {
            return -1;
          }
          return 1;
        });
        break;
      case "city":
        this.shownEmployees.sort((a, b) => {
          if(a.city.toLowerCase()<b.city.toLowerCase()) {
            return -1;
          }
          return 1;
        });
        break;
      case "postcode":
        this.shownEmployees.sort((a, b) => {
          if(a.postcode.toLowerCase()<b.postcode.toLowerCase()) {
            return -1;
          }
          return 1;
        });
        break;
      case "phone":
        this.shownEmployees.sort((a, b) => {
          if(a.phone.toLowerCase()<b.phone.toLowerCase()) {
            return -1;
          }
          return 1;
        });
        break;

    }


  }

  private includesSearchParameter(e: Employee): boolean {
    return e.id.toString().toLowerCase().includes(this.searchParameter.toLowerCase()) ||
      e.city.toLowerCase().includes(this.searchParameter.toLowerCase()) ||
      e.phone.toLowerCase().includes(this.searchParameter.toLowerCase()) ||
      e.street.toLowerCase().includes(this.searchParameter.toLowerCase()) ||
      e.postcode.toLowerCase().includes(this.searchParameter.toLowerCase()) ||
      e.firstName.toLowerCase().includes(this.searchParameter.toLowerCase()) ||
      e.lastName.toLowerCase().includes(this.searchParameter.toLowerCase());

  }



}
