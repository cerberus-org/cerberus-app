import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-team-dialog',
  template: `
    <div class="dialog">
      <div class="grid grid--center">
        <i class="material-icons icon-image">group_work</i>
        <app-team-form
          [title]="title"
          [subtitle]="subtitle"
        >
        </app-team-form>
      </div>
    </div>
  `,
  styleUrls: ['./create-team-dialog.component.scss'],
})
export class CreateTeamDialogComponent implements OnInit {
  title = 'Create a new team';
  subtitle = 'Tell us more about your team to get started. Don\'t worry, you will be able to change these later.';

  constructor() { }

  ngOnInit() {
  }

}
