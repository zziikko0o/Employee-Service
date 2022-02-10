import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Employee} from "../../Models/employee";
import {Qualification} from "../../Models/qualification";
import {QualificationService} from "../../services/qualification.service";
import {EmployeeService} from "../../services/employee.service";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-employee-add-page',
  templateUrl: './employee-add-page.component.html',
  styleUrls: ['./employee-add-page.component.css']
})
export class EmployeeAddPageComponent implements OnInit, AfterViewInit {

  employee: Employee = new Employee();
  qualification: Qualification = new Qualification();
  qualifications: Qualification[];
  ownQualifications: Qualification[] = [];
  selectedQualification: Qualification;

  faTrashCan = faTrashAlt;

  constructor(private qualificationService: QualificationService, private employeeService: EmployeeService) {

  }

  ngOnInit(): void {
    this.qualificationService.getQualifications();
    this.qualificationService.qualifications$.subscribe(qualifications => this.qualifications = qualifications);
  }

  ngAfterViewInit(): void {

  }

  async newQualification() {
    if(this.qualification.designation != '')
    {
      await this.qualificationService.create(this.qualification);
      this.qualificationService.getQualifications();
    }
    this.clearNewQualification();
  }

  addQualification() {
    if(this.selectedQualification === undefined) return;

    if(!this.ownQualifications.includes(this.selectedQualification)) {
      this.ownQualifications.push(this.selectedQualification);
    }
  }

  removeQualification(designation: string) {
     this.ownQualifications =  this.ownQualifications.filter(q => q.designation != designation);
  }

  async addNewEmployee() {

    try {
      await this.employeeService.createEmployee(this.employee, this.ownQualifications);
      this.clearNewEmployee();
      alert('Mitarbeiter gespeichert');
    }
    catch (e) {
      alert('Bitte überprüfen ob sie alles richtig ausgefüllt haben oder der Mitarbeiter nicht schon existiert');
    }
  }

  private clearNewQualification() {
    this.qualification.designation = '';
  }

  private clearNewEmployee () {
    this.employee = new Employee();
    this.ownQualifications = [];
  }


}
