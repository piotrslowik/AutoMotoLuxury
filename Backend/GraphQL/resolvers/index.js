import offersResolver from './offer.js';
import userResolver from './user.js';
import originResolver from './origin.js';
import makeResolver from './make.js';
import modelResolver from './model.js';
import fuelResolver from './fuel.js';

export default {
    ...offersResolver,
    ...userResolver,
    ...originResolver,
    ...makeResolver,
    ...modelResolver,
    ...fuelResolver,
}
