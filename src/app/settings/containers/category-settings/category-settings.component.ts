import { Component, OnInit } from '@angular/core';
import { createSelector, select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs/index';
import { SessionReducerState } from '../../../auth/reducers/session.reducer';
import { selectModelCategories } from '../../../core/selectors/model.selectors';
import { ColumnOptions } from '../../../shared/models';
import { Category } from '../../../shared/models/category';

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

  constructor(public store$: Store<SessionReducerState>) {}

  ngOnInit(): void {
    this.categories$ = this.store$.pipe(select(selectModelCategories));
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

  onCreateCategory(category: Category) {

  }
}
