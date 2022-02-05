export class Qualification {
  constructor(public designation?: string) {
  }
  public toString() :string {
    return this.designation;
  }
}
