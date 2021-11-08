import parameters from './parameters';
import offer from './offer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  parameters,
  offer,
});

export default reducers;
