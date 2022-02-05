import {Qualification} from "./qualification";
import {SimpleEmployeeDto} from "./simpleEmployeeDto";

export class GetEmployeesByQualificationDto {
  constructor(public designation?: string, public employees?: SimpleEmployeeDto[]) {
  }
}
