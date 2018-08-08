export class Volunteer {
  id: string;
  teamId: string;
  name: string;
  petName: string;

  constructor(name: string, petName: string) {
    this.name = name;
    this.petName = petName;
  }
}
