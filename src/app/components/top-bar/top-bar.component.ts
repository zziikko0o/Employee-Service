import { Component, OnInit } from '@angular/core';
import {faAddressCard} from "@fortawesome/free-solid-svg-icons";
import {DataManagementService} from "../../services/data-management.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  faCoffee = faAddressCard;

  constructor(private dataService: DataManagementService) { }

  ngOnInit(): void {
  }

  signOut() {
    this.dataService.showLogin();
  }

  changePage(id: string) {
    document.getElementById(id).classList.add('nav-selected')

    if(id != 'qualifications' ) {
      document.getElementById('qualifications').classList.remove('nav-selected')
    }
    else {
      document.getElementById('employee_list').classList.remove('nav-selected')
    }

  }

}
