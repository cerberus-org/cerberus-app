export class Organization {
  id: string;
  name: string;
  description: string;
  website: string;

  constructor(name: string, description: string, website: string) {
    this.name = name;
    this.description = description;
    this.website = website;
  }
}

export const testOrganizations: Organization[] = [
  {
    id: 'Y9oY2YPuxeWxB7x69Ayr',
    name: 'Jefferson SPCA',
    description: 'The Jefferson SPCA exists to support the Jefferson Parish Animal Shelter.',
    website: 'www.jeffersonspca.org'
  },
  {
    id: 'Y9oY2YPuxeWxB7x69Ayq',
    name: 'The Louisiana SPCA',
    description: 'Helping more than 43000 animals in Greater New Orleans every year.',
    website: 'www.la-spca.org'
  }
];
