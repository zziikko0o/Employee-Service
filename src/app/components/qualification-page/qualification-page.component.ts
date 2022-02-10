import { Component, OnInit } from '@angular/core';
import {QualificationService} from "../../services/qualification.service";
import {Qualification} from "../../Models/qualification";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-qualification-page',
  templateUrl: './qualification-page.component.html',
  styleUrls: ['./qualification-page.component.css']
})
export class QualificationPageComponent implements OnInit {
  qualification: Qualification = new Qualification();
  qualifications: Qualification[] = [];
  shownQualifications: Qualification[] = [];

  searchParameter: string = '';

  faTrashCan = faTrashAlt;


  constructor(private qualificationService: QualificationService) { }

  ngOnInit(): void {
    this.qualificationService.getQualifications();
    this.qualificationService.qualifications$.subscribe(qualifications => {
      this.qualifications = qualifications;
      this.updateShownQualifications();
    });
  }

  async deleteQualification(qualification: Qualification) {
    await this.qualificationService.deleteQualification(qualification);
    this.qualificationService.getQualifications();
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

  updateShownQualifications() {
    this.shownQualifications = [];
    this.qualifications.forEach(q => this.shownQualifications.push(q));
  }

  refreshSearch() {
    console.log(this.searchParameter)
    this.shownQualifications = this.qualifications.filter(q => q.designation.toLowerCase().includes(this.searchParameter.toLowerCase()));
  }

}
