import parameters from './parameters';
import offer from './offer';
import offers from './offers';
import error from './error';
import helpers from './helpers';
import users from './users';
import user from './user';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  parameters,
  offer,
  offers,
  error,
  helpers,
  users,
  user,
});

export default reducers;
