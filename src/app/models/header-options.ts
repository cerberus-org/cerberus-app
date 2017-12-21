export class HeaderOptions {
  title: string;
  icon: string;
  previousUrl: string;

  constructor(title: string, icon: string, previousUrl: string) {
    this.title = title;
    this.icon = icon;
    this.previousUrl = previousUrl;
  }
}

export const testHeaderOptions: HeaderOptions[] = [
  {
    title: 'Welcome',
    icon: 'sun',
    previousUrl: '/login'
  }
];
