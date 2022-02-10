import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from "../../services/login.service";
/* OnInit : Interface utilisée pour exécuter du code lors de l'initialisation du composant.*/

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  @Input()
  public username: string = "";
  @Input()
  public password: string = "";

  private timer: number = 0;
/* private timer : Une propriété privée utilisée pour gérer un verrouillage temporaire 
après plusieurs tentatives infructueuses (en millisecondes, basé sur l'heure actuelle).*/
  
constructor(private loginService: LoginService) { }
//Injection de dépendance : vérification des identifiants

  ngOnInit(): void {
  }

  public async login() {

    if(this.timer <= Date.now()) {
      switch (await this.loginService.login(this.username, this.password)) {
        //Appel du service loginService.login :
        case "true":
          this.clearData();
          break;
        case "false":
          break;
        case "lock":
          this.timer = Date.now() + 180000;
          alert("Benutzerdaten zu oft falsch eingegeben, der Login wird nun für 3 Minuten gesperrt");
          break;
        default:
          break;
      }
    } else {
      alert("Der Login ist noch gesperrt");
    }
  }

  clearData() {
    this.username = '';
    this.password = '';
  }

}
