export class HeaderOptions {
  title: string;
  icon: string;

  constructor(title: string, icon: string, previousUrl: string) {
    this.title = title;
    this.icon = icon;
  }
}

export const testHeaderOptions: HeaderOptions[] = [
  {
    title: 'Welcome',
    icon: 'sun',
  }
];
