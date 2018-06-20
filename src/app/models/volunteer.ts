export class Volunteer {
  id: string;
  organizationId: string;
  firstName: string;
  lastName: string;
  petName: string;

  constructor(organizationId: string, firstName: string, lastName: string, petName: string) {
    this.organizationId = organizationId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.petName = petName;
  }
}
