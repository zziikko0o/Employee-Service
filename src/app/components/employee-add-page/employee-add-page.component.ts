import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Employee} from "../../Models/employee";
import {Qualification} from "../../Models/qualification";
import {QualificationService} from "../../services/qualification.service";
import {EmployeeService} from "../../services/employee.service";

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

  constructor(private qualificationService: QualificationService, private employeeService: EmployeeService) {

  }

  ngOnInit(): void {
    this.qualificationService.getQualifications();
    this.qualificationService.qualifications$.subscribe(qualifications => this.qualifications = qualifications);
  }

  ngAfterViewInit(): void {

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

  addQualification() {
    console.log(this.selectedQualification)

    if(this.selectedQualification === undefined) return;

    if(!this.ownQualifications.includes(this.selectedQualification)) {
      this.ownQualifications.push(this.selectedQualification);
    }


    console.log(this.ownQualifications);
  }

  removeQualification(designation: string) {
     this.ownQualifications =  this.ownQualifications.filter(q => q.designation != designation);
  }

  addNewEmployee() {
    this.employeeService.createEmployee(this.employee, this.ownQualifications);
    this.clearNewEmployee();
  }

  private clearNewQualification() {
    this.qualification.designation = '';
  }

  private clearNewEmployee () {
    this.employee = new Employee();
    this.ownQualifications = [];
  }


}
