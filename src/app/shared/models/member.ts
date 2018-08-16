export class Member {
  id: string;
  userUid: string;
  teamId: string;
  firstName?: string;
  lastName?: string;
  role?: string;

  constructor(
    firstName: string = '',
    lastName: string = '',
    role?: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
  }
}
