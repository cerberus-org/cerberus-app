export class Organization {
  _id: string;
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
    _id: '59a7055733bfe28af47cff40',
    name: 'Jefferson SPCA',
    description: 'The Jefferson SPCA exists to support the Jefferson Parish Animal Shelter.',
    website: 'www.jeffersonspca.org'
  },
  {
    _id: '59a7055733bfe28af47cff41',
    name: 'The Louisiana SPCA',
    description: 'Helping more than 43000 animals in Greater New Orleans every year.',
    website: 'www.la-spca.org'
  }
];
