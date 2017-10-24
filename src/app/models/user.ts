export class User {
  id: string;
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
    id: '5961327dfba1ca1b64b8945a',
    organizationId: '59a7055733bfe28af47cff40',
    firstName: 'Ted',
    lastName: 'Mader',
    email: 'tlmader.dev@gmail.com',
    password: null,
    role: 'admin'
  }, {
    id: '5961327dfba1ca1b64b8945b',
    organizationId: '59a7055733bfe28af47cff40',
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
