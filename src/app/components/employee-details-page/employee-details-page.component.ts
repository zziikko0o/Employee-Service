import {Component, Input, OnInit} from '@angular/core';
import {Employee} from "../../Models/employee";
import {Qualification} from "../../Models/qualification";
import {Q} from "@angular/cdk/keycodes";
import {QualificationService} from "../../services/qualification.service";
import {DataManagementService} from "../../services/data-management.service";
import {EmployeeService} from "../../services/employee.service";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-employee-details-page',
  templateUrl: './employee-details-page.component.html',
  styleUrls: ['./employee-details-page.component.css']
})
export class EmployeeDetailsPageComponent implements OnInit {
  qualification: Qualification = new Qualification();
  qualifications: Qualification[] = [];
  selectedQualification: Qualification = new Qualification();
  ownQualifications: Qualification[] = [];

  originalQualifications: Qualification[] = [];
  removedQualifications: Qualification[] = [];
  addedQualifications: Qualification[] = [];

  employee: Employee = new Employee();

  faTrashCan = faTrashAlt;


  constructor(
    private qualificationService: QualificationService,
    private employeeService: EmployeeService,
    private dataService: DataManagementService
              ) { }

  ngOnInit(): void {
    this.qualificationService.getQualifications();
    this.qualificationService.qualifications$.subscribe(qualifications => this.qualifications = qualifications);
    this.initialize();
  }

  async initialize() {
    this.employee = this.employeeService.getEmployee(this.dataService.employeeId);
    this.ownQualifications = await this.employeeService.getEmployeeQualifications(this.dataService.employeeId);
    this.ownQualifications.forEach(q => this.originalQualifications.push(q));
  }

  async newQualification() {
    console.log(this.qualification.designation);
    if(this.qualification.designation != '')
    {
      await this.qualificationService.create(this.qualification);
      this.qualificationService.getQualifications();
      console.log(this.qualifications)
    }
    this.clearNewQualification();
  }

  private clearNewQualification() {
    this.qualification.designation = '';
  }

  async removeQualification(qualification: Qualification) {
    this.ownQualifications =  this.ownQualifications.filter(q => q.designation != qualification.designation);
  }

  addQualification() {
    console.log(this.selectedQualification)

    if (this.selectedQualification === undefined) return;

    if (!this.ownQualifications.includes(this.selectedQualification)) {
      this.ownQualifications.push(this.selectedQualification);
    }
  }

  async updateEmployee() {
    this.employeeService.updateEmployee(this.employee);

    this.originalQualifications.forEach(q => {
      if(!this.ownQualifications.includes(q)) {
        this.removedQualifications.push(q)
      }
    })

    this.ownQualifications.forEach(q => {
      if(!this.originalQualifications.includes(q)) {
        this.addedQualifications.push(q);
      }
    })


    for (const q of this.addedQualifications) {
      await this.employeeService.addEmployeeQualification(this.employee.id, q);
    }

    for (const q of this.removedQualifications) {
      await this.employeeService.removeEmployeeQualification(this.employee.id, q);
    }
  }

}
