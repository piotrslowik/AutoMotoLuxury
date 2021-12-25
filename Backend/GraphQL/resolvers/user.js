import User from '../../Models/user.js';

import bcryptjs from 'bcryptjs';
const { hash, compare }  = bcryptjs;
import jwt from 'jsonwebtoken';

import { offers, parseWithId } from './helpers.js';

export default {
  createUser: async args => {
    console.log("Creating user");
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
  login: async ({email, password}) => {
    try {
      const user = await User.findOne({ email, isDeleted: false });
      if (!user) {
        return new Error('Niepoprawny email lub hasło');
      }
      const isValid = await compare(password, user.password);
      if (!isValid) {
        return new Error('Niepoprawny email lub hasło');
      }
      const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '24h',
      });
      return {
        user: {
          _id: user._id,
          isAdmin: user.isAdmin,
          email: user.email,
          observedOffers: user.observedOffers,
          createdOffers: user.isAdmin ? user.createdOffers : null,
        },
        token,
        tokenExpiration: 24,
      };
    }
    catch (error) {
      console.error(error);
    }
  },
  users: async (args, req) => {
    if (!req.isAdmin) return new Error('Brak uprawnień administratora');
    try {
      const users = await User.find({ isDeleted: false });
      return users.map(users => parseWithId(users));
    }
    catch (error) {
      console.error(error);
      return error;
    }
  },
  changeRole: async (args, req) => {
    if (!req.isAdmin) return new Error('Brak uprawnień administratora');
    const isAdmin = args.userEditInput.isAdmin;
    try {
      // make sure we don't remove last admin
      if (!isAdmin) {
        const admins = await User.find({ isAdmin: true, isDeleted: false });
        if (admins.length < 2 ) return new Error('Jesteś jedynym administratorem');
      }
      const user = await User.findOne({ _id: args.userEditInput.userId, isDeleted: false });
      user.isAdmin = isAdmin;
      const result = await user.save();
      return parseWithId(result);
    }
    catch (error) {
      console.error(error);
      return error;
    }
  },
  toggleFavoriteOffer: async (args, req) => {
    if (!req.isAuth) return new Error('Dodawać do ulubionych mogą tylko zalogowani użytkownicy');
    const { userId, offerId } = args.favoritesInput;
    if (req.userId !== userId) return new Error('Nie masz uprawnień do tej zmiany');
    try {
      const user = await User.findOne( { _id: userId, isDeleted: false });
      if (!user) return new Error('To konto nie jest dostępne');
      const favs = user.observedOffers;
      if (favs.includes(offerId)) favs.remove(offerId);
      else favs.push(offerId);
      user.observedOffers = favs;
      const result = await user.save();
      return parseWithId(result);
    }
    catch (error) {
      console.error(error);
      return error;
    }
  }
}
