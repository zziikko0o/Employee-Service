import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Employee} from "../../Models/employee";
import {Qualification} from "../../Models/qualification";
import {QualificationService} from "../../services/qualification.service";

@Component({
  selector: 'app-employee-add-page',
  templateUrl: './employee-add-page.component.html',
  styleUrls: ['./employee-add-page.component.css']
})
export class EmployeeAddPageComponent implements OnInit, AfterViewInit {

  employee: Employee = new Employee();
  qualification: Qualification = new Qualification();
  qualifications: Qualification[];

  constructor(private qualificationService: QualificationService) {
    this.qualificationService.getQualifications();
    this.qualificationService.qualifications$.subscribe(qualifications => this.qualifications = qualifications);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  addQualification() {
    console.log(this.qualification.designation);
    if(this.qualification.designation != "")
    {
      this.qualificationService.create(this.qualification);
      this.qualificationService.getQualifications();
      console.log(this.qualifications)
    }
  }


}
