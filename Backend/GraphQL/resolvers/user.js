import User from '../../Models/user.js';

import bcryptjs from 'bcryptjs';
const { hash }  = bcryptjs;

import { offers, parseWithId } from './helpers.js';
import mongoose from 'mongoose';
const { Error } = mongoose;

export default {
  createUser: async args => {
    try {
      if (args.userInput.email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) === null) {
        return new Error('Podano nieprawidłowy adres email');
      }
      if (args.userInput.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/g) === null) {
        return new Error('Podano nieprawidłowe hasło');
      }
      const existingUser = await User.findOne({ email: args.userInput.email, isDeleted: false });
      if (existingUser) {
        return new Error('Użytkownik z tym emailem już istnieje');
      }
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
    catch (error) {
      console.error(error);
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
    }
  },
}
