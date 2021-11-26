import User from '../../Models/user.js';

import bcryptjs from 'bcryptjs';
const { hash}  = bcryptjs;

import { offers, parseWithId } from './helpers.js';

export default {
  createUser: async args => {
    try {
      const existingUser = await findOne({ email: args.userInput.email, isDeleted: false });
      console.log(existingUser, args.userInput);
      if (existingUser) {
        throw new Error('User with that e-mail address already exists');
      }
      else {
        const hashedPassword = await hash(args.userInput.password, 12);
        const newUser = new User({
          email: args.userInput.email,
          password: hashedPassword,
          isDeleted: false,
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
      const user = await findById(args.userId);
      await deleteOne({_id: args.userId});
      return parseWithId(user);
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  },
}
