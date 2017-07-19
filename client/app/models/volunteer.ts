export class Volunteer {
  _id: string;
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
  firstName: 'Ted',
  lastName: 'Mader',
  petName: 'Mimi'
}, {
  _id: '5961327dfba1ca1b64b8945b',
  firstName: 'Hillary',
  lastName: 'Arurang',
  petName: 'Bandit'
}, {
  _id: '5961327dfba1ca1b64b8945c',
  firstName: 'Ted',
  lastName: 'Mader',
  petName: 'Gam-Gam'
}];
