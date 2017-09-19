import BaseHandler from './base';
import Organization from '../models/organization';

export default class OrganizationHandler extends BaseHandler {
  model = Organization;
}
