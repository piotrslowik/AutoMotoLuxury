import parameters from './parameters';
import offer from './offer';
import { combinedReducer } from 'redux';

const reducers = combinedReducer({
  parameters,
  offer,
});

export default reducers;
