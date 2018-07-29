export interface Category {
  id: string;
  label: string;
  description: string;
  organizationId: string;
}

export class Category {
  label: string;
  description: string;

  constructor(
    label: string,
    description: string,
  ) {
    this.label = label;
    this.description = description;
  }
}
