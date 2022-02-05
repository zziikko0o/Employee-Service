import {Qualification} from "./qualification";

export class GetEmployeeQualificationDto {
  constructor(public id?: number, public lastName?: string, public firstName?: string, public skillSet?: Qualification[]) {
  }
}
