import { Injectable } from '@angular/core';
import BaseService from './base.service';
import { Http } from '@angular/http';

@Injectable()
export class OrganizationService extends BaseService {
  model: any;
  modelName: 'organization';

  constructor(protected http: Http) {
    super(http);
  }
}
