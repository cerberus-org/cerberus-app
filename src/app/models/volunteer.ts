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

export const testVolunteers: Volunteer[] = [{
  id: '5961327dfba1ca1b64b8945a',
  organizationId: '59a7055733bfe28af47cff40',
  firstName: 'Ted',
  lastName: 'Mader',
  petName: 'Mimi',
}, {
  id: '5961327dfba1ca1b64b8945b',
  organizationId: '59a7055733bfe28af47cff40',
  firstName: 'Hillary',
  lastName: 'Arurang',
  petName: 'Bandit',
}, {
  id: '5961327dfba1ca1b64b8945c',
  organizationId: '59a7055733bfe28af47cff40',
  firstName: 'Ted',
  lastName: 'Mader',
  petName: 'Gam-Gam',
}];
