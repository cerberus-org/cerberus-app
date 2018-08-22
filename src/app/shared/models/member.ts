import { Roles } from './roles';

export class Member {
  id: string;
  userId: string;
  teamId: string;
  firstName?: string;
  lastName?: string;
  role?: Roles;

  constructor(
    firstName: string = '',
    lastName: string = '',
    role?: Roles,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
  }
}
