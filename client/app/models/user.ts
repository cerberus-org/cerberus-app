export class User {
  _id: string;
  organizationId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;

  constructor(firstName: string, lastName: string, email: string, password: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.role = 'admin'; // TODO: Implement user roles
  }
}

export const testUsers: User[] = [
  {
    _id: '5961327dfba1ca1b64b8945a',
    organizationId: null,
    firstName: 'Ted',
    lastName: 'Mader',
    email: 'tlmader.dev@gmail.com',
    password: null,
    role: 'admin'
  }, {
    _id: '5961327dfba1ca1b64b8945b',
    organizationId: null,
    firstName: 'Hillary',
    lastName: 'Lynn',
    email: 'harurang@gmail.com',
    password: null,
    role: 'admin'
  },
];

export const testLoginCredentials: any = [{
  email: 'Test@gmail.com',
  password: 'test',
}];
