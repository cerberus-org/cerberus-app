/**
 * The database consists of a User object and a Firebase User object.
 * Both objects are coupled in this object for simplicity.
 * The User service removes all fields that are only meant to be in the
 * Firebase User object on convert out.
 */
export class User {
  id: string;
  organizationId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role?: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
