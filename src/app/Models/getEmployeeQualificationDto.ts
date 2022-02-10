import {Qualification} from "./qualification";

export class GetEmployeeQualificationDto {
  constructor(public id?: number, public lastName?: string, public firstName?: string, public skillSet?: Qualification[]) {
  }
}
//skillSet est un tableau d'objets de type Qualification. Il représente l'ensemble des qualifications (ou compétences) de l'employé.