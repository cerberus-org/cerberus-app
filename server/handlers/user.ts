import BaseHandler from './base';
import User from '../models/user';

export default class UserHandler extends BaseHandler {
  model = User;
}
