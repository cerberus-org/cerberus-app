import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { select, Store } from '@ngrx/store';
import {Observable, Subscription} from 'rxjs/index';
import { SessionReducerState } from '../../../auth/reducers/session.reducer';
import { selectSessionMember } from '../../../auth/selectors/session.selectors';
import { AppState } from '../../../core/reducers';
import { selectModelCategories } from '../../../core/selectors/model.selectors';
import { ColumnOptions, Member } from '../../../shared/models';
import { Category } from '../../../shared/models/category';
import * as SettingsActions from '../../actions/settings.actions';
import { CategoryDialogComponent } from '../../components/create-category-dialog/category-dialog.component';

@Component({
  selector: 'app-category-settings',
  templateUrl: './category-settings.component.html',
  styleUrls: ['./category-settings.component.scss'],
})
export class CategorySettingsComponent implements OnInit {
  columnOptions: ColumnOptions[] = [
    new ColumnOptions(
      'label',
      'Label',
      (row: Category) => row.label,
    ),
    new ColumnOptions(
      'description',
      'Description',
      (row: Category) => row.description,
    ),
  ];
  public categories$: Observable<Category[]>;
  public member: Member;
  public memberSubscription: Subscription;

  constructor(public store$: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.categories$ = this.store$.pipe(select(selectModelCategories));
    this.memberSubscription = this.store$.pipe(select(selectSessionMember)).
      subscribe((member: Member) => {
        this.member = member;
      });
  }

  ngOnDestroy(): void {
    if (this.memberSubscription) {
      this.memberSubscription.unsubscribe();
    }
  }

  setLocalStorageCategory(category: string) : void {
    localStorage.setItem('category', JSON.stringify(category));
  }

  getLocalStorageCategory(): string {
    return localStorage.getItem('category');
  }

  onDeleteCategory(category: Category) {
  }

  onUpdateCategory(category: Category) {
  }

  openCategoryModal() {
    const dialog = this.dialog.open(CategoryDialogComponent);
    dialog.afterClosed().subscribe((category: Category) => {
      if (category.label) {
        this.store$.dispatch(Object.assign({}, new SettingsActions.CreateCategory(category), { organizationId: this.member.organizationId }));
      }
    });
  }
}
