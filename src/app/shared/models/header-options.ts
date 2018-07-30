export class HeaderOptions {
  title: string;
  icon?: string;
  previousUrl: string;
  showSettings?: boolean;

  constructor(title: string, icon: string, previousUrl: string, showSettings: boolean) {
    this.title = title;
    this.icon = icon;
    this.previousUrl = previousUrl;
    this.showSettings = showSettings;
  }
}
