export class User {
  id: string;
  organizationId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor(firstName: string,
              lastName: string,
              email: string,
              password: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}

export const testUsers: User[] = [
  {
    id: 'Fc59YPNibdPXlIjdRuBRIrizClI2',
    organizationId: 'Y9oY2YPuxeWxB7x69Ayr',
    firstName: 'Ted',
    lastName: 'Mader',
    email: 'tlmader.dev@gmail.com',
    password: 'password',
  }, {
    id: '5961327dfba1ca1b64b8945b',
    organizationId: '59a7055733bfe28af47cff40',
    firstName: 'Hillary',
    lastName: 'Lynn',
    email: 'harurang@gmail.com',
    password: null,
  },
];

export const testLoginCredentials: any = [{
  email: 'Test@gmail.com',
  password: 'test',
}];
