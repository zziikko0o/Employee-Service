import { Component, OnInit } from '@angular/core';
import {faAddressCard, faCoffee} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  faCoffee = faAddressCard;

  constructor() { }

  ngOnInit(): void {
  }

}
