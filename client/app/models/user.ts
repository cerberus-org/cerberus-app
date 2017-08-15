export class User {
  _id: string;
  email: string;
  username: string;
}

export const testUsers: User[] = [{
    _id: '5961327dfba1ca1b64b8945a',
    email: 'tlmader.dev@gmail.com',
    username: 'tlmader'
  }, {
    _id: '5961327dfba1ca1b64b8945b',
    email: 'harurang@gmail.com',
    username: 'harurang'
  },
];

export const testLoginCredentials: any = [{
  email: 'Test@gmail.com',
  password: 'test'
}];
