import Volunteer from '../models/volunteer';
import BaseHandler from './base';

export default class VolunteerHandler extends BaseHandler {
  model = Volunteer;
}
