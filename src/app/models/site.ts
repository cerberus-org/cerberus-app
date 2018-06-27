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
