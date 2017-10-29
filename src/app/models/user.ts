export class User {
  id: string;
  organizationId: string;
  firstName: string;
  lastName: string;

  constructor(organizationId: string,
              firstName: string,
              lastName: string) {
    this.organizationId = organizationId;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

export const testUsers: User[] = [
  {
    id: 'Fc59YPNibdPXlIjdRuBRIrizClI2',
    organizationId: 'Y9oY2YPuxeWxB7x69Ayr',
    firstName: 'Ted',
    lastName: 'Mader',
  }, {
    id: '5961327dfba1ca1b64b8945b',
    organizationId: '59a7055733bfe28af47cff40',
    firstName: 'Hillary',
    lastName: 'Lynn'
  },
];

export const testLoginCredentials: any = [{
  email: 'Test@gmail.com',
  password: 'test',
}];
