import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { LoginPageComponent } from './components/login-page/login-page.component';
import { EmployeeListPageComponent } from './components/employee-list-page/employee-list-page.component';
import { EmployeeDetailsPageComponent } from './components/employee-details-page/employee-details-page.component';
import { EmployeeAddPageComponent } from './components/employee-add-page/employee-add-page.component';
import { QualificationPageComponent } from './components/qualification-page/qualification-page.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    EmployeeListPageComponent,
    EmployeeDetailsPageComponent,
    EmployeeAddPageComponent,
    QualificationPageComponent,
    TopBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
