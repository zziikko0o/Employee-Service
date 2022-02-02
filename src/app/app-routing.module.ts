import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {EmployeeListPageComponent} from "./components/employee-list-page/employee-list-page.component";
import {EmployeeDetailsPageComponent} from "./components/employee-details-page/employee-details-page.component";
import {EmployeeAddPageComponent} from "./components/employee-add-page/employee-add-page.component";
import {QualificationPageComponent} from "./components/qualification-page/qualification-page.component";



const routes: Routes = [
  {path: '', component: EmployeeListPageComponent},
  {path: 'employeeDetails', component: EmployeeDetailsPageComponent},
  {path: 'employeeAdd', component: EmployeeAddPageComponent},
  {path: 'qualification', component: QualificationPageComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
