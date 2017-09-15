export class Volunteer {
  _id: string;
  organizationId: string;
  locationId: string;
  firstName: string;
  lastName: string;
  petName: string;

  constructor(firstName: string, lastName: string, petName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.petName = petName;
  }
}

export const testVolunteers: Volunteer[] = [{
  _id: '5961327dfba1ca1b64b8945a',
  organizationId: '59a7055733bfe28af47cff40',
  locationId: '59bc1e7ad92a6ac6f6252bfa',
  firstName: 'Ted',
  lastName: 'Mader',
  petName: 'Mimi'
}, {
  _id: '5961327dfba1ca1b64b8945b',
  organizationId: '59a7055733bfe28af47cff40',
  locationId: '59bc1e7ad92a6ac6f6252bfa',
  firstName: 'Hillary',
  lastName: 'Arurang',
  petName: 'Bandit'
}, {
  _id: '5961327dfba1ca1b64b8945c',
  organizationId: '59a7055733bfe28af47cff40',
  locationId: '59bc1e7ad92a6ac6f6252bfa',
  firstName: 'Ted',
  lastName: 'Mader',
  petName: 'Gam-Gam'
}];
