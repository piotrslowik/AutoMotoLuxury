import parameters from './parameters';
import offer from './offer';
import error from './error';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  parameters,
  offer,
  error,
});

export default reducers;
