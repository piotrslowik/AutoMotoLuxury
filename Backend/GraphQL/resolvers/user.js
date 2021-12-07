import User from '../../Models/user.js';

import bcryptjs from 'bcryptjs';
const { hash }  = bcryptjs;

import { offers, parseWithId, Error } from './helpers.js';

export default {
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email, isDeleted: false });
      if (existingUser) {
        return {
          __resolveType: 'Error',
          ...new Error('Użytkownik z tym emailem już istnieje'),
        };
      }
      else {
        const hashedPassword = await hash(args.userInput.password, 12);
        const newUser = new User({
          email: args.userInput.email,
          password: hashedPassword,
          createdOffers: [],
          observedOffers: [],
          isDeleted: false,
          isAdmin: false,
        });
        const result = await newUser.save();
        return {
          ...result._doc,
          password: null,
          _id: newUser.id,
          createdOffers: offers.bind(this, result._doc.createdOffers),
        };
      }
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  },
  deleteUser: async args => {
    try {
      const user = await User.findById(args.userId);
      await User.deleteOne({ _id: args.userId });
      return parseWithId(user);
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  },
}
