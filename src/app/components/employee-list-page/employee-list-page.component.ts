import {AfterViewInit, Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {Employee} from "../../Models/employee";
import {LoginService} from "../../services/login.service";
import {DataManagementService} from "../../services/data-management.service";
import {Qualification} from "../../Models/qualification";
import {QualificationService} from "../../services/qualification.service";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";


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
//Le constructeur initialise les services nécessaires pour récupérer les données
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
    /* empêche l'événement de clic de se propager, empêchant ainsi l'action
     de déclencher d'autres événements */

    await this.employeeService.deleteEmployee(id);
    this.employeeService.getEmployees();
  }

  addEmployee() {

  }


  showEmployeeDetails(id: number) {
    this.dataService.employeeId = id;
  }
//Cette méthode permet de naviguer vers la page des détails d'un employé

  updateShownEmployees() {
    this.shownEmployees = [];
    this.employees.forEach(e => this.shownEmployees.push(e));
  }
//Cette méthode copie tous les employés de employees dans shownEmployees

  async filterForQualification() {
    this.updateShownEmployees();
    let response = await this.qualificationService.getEmployeesByQualification(this.selectedQualification);
    let ids: number[] = [];
    response.employees.forEach(e => ids.push(e.id));

    this.shownEmployees = this.employees.filter(e => ids.includes(e.id));

  }
//Cette méthode permet de filtrer les employés en fonction de la qualification sélectionnée

  refreshSearch() {
    this.shownEmployees = this.employees.filter(e => this.includesSearchParameter(e))
  }
/*
Cette méthode permet de rechercher des employés en fonction du searchParameter.
Elle filtre les employés dont les attributs (ID, prénom, nom, etc.) contiennent le terme de recherche.
*/
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
/*Cette méthode permet de trier les employés en fonction de la colonne sur laquelle 
l'utilisateur clique (ID, prénom, nom, etc.). */

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
/*
Cette méthode vérifie si l'un des attributs d'un employé (ID, ville, téléphone, adresse, etc.) 
contient le terme de recherche searchParameter.
 Elle est utilisée dans refreshSearch() pour filtrer les employés.
*/


}
