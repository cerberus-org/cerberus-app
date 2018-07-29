import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as _ from 'lodash';
import { Category } from '../../shared/models/category';
import { BaseService } from './base.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BaseService<Category> {
  collectionName = 'categories';

  constructor(
    protected db: AngularFirestore,
    protected errorService: ErrorService,
  ) {
    super(db, errorService);
  }

  /**
   * Handles capitalization logic for categories.
   *
   * @param {Category} category - the category to capitalize properties for
   * @returns {Category} - a new category with capitalized properties
   */
  private capitalizeCategory(category: Category): Category {
    return {
      ...category,
      label: _.capitalize(category.label),
      description: _.capitalize(category.description),
    };
  }

  /**
   * Capitalize the label of the category going to the database.
   *
   * @param {Category} category - the category to capitalize properties for
   * @returns {Category} - a new category with capitalized properties
   */
  mapObjectToDoc(category: Category): Category {
    return this.capitalizeCategory(category);
  }

  /**
   * Capitalize the label of the category coming from the database.
   *
   * @param {Category} category - the category to capitalize properties for
   * @returns {Category} - a new site with capitalized properties
   */
  mapDocToObject(category: Category): Category {
    return this.capitalizeCategory(category);
  }
}
