export class Volunteer {
  id: string;
  organizationId: string;
  firstName: string;
  lastName: string;
  petName: string;

  constructor(firstName: string, lastName: string, petName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.petName = petName;
  }
}
