export class Qualification {
  constructor(public designation?: string) {
  }
  public toString() :string {
    return this.designation;
  }
  //renvoie cette designation sous forme de chaîne de caractères, ou undefined si la propriété n'est pas définie.
}
