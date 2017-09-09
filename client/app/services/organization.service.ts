import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import BaseService from './base.service';

@Injectable()
export class OrganizationService extends BaseService {

  constructor(protected http: Http) {
    super(http);
    this.modelName = 'organization';
  }
}
