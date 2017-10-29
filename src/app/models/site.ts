export class Site {
  id: string;
  organizationId: string;
  name: string;
  address: string;

  constructor(organizationId: string, name: string, address: string) {
    this.organizationId = organizationId;
    this.name = name;
    this.address = address;
  }
}

export const testSites: Site[] = [
  {
    id: '59a7055733bfe28af47cff40',
    organizationId: '59a7055733bfe28af47cff40',
    name: 'Jefferson SPCA Animal Shelter',
    address: '1 Humane Way, New Orleans, LA 70123'
  },
  {
    id: '59a7055733bfe28af47cff41',
    organizationId: '59a7055733bfe28af47cff40',
    name: 'Jefferson Parish Animal Shelter',
    address: '2701 Lapalco Blvd, Harvey, LA 70058'
  }
];
