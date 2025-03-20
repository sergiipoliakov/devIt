import { Request, Response } from 'express';
import { errorHandler } from "../helpers/error.hl";
import { User } from '../model/user.model';

const resolvers = {
  resolveUsers: async (_: any, __: { req: Request }) => {
    try {
      const users = await User
        .find()
        .then((users) => users)
        .catch((e) => errorHandler(e));
      console.log("🚀 ~ resolveUser: ~ users:", users)
      return users;
    } catch (e) {
      errorHandler(e);
    }
  },
  resolveUser: async (args: { id: any }, __: { req: Request }) => {
    try {
      const { id } = args;
      const userData = await User
        .findById(id)
        .then((users) => users)
        .catch((e) => errorHandler(e));
      return userData;
    } catch (e) {
      errorHandler(e);
    }
  },
  resolveRegisterUser: async (args: { data: { name: string, email: string } }, ctx: { req: Request, res: Response }) => {
    try {
      const { req } = ctx;
            const { 
                data: { 
                  name, 
                  email
                }
            } = args;
      const newUser = await User
        .create({
          email,
          name,
        })
        .then((users) => users)
        .catch((e) => errorHandler(e));
      return newUser;
    } catch (e) {
      errorHandler(e);
    }
  },
  resolveUpdateUser: async (args: { data: any }, __: { req: Request }) => {

    try {
      const { data: { userId, balance} } = args;
      const newUser = await User
        .findByIdAndUpdate(userId, {
          balance
        })
        .then((users) => users)
        .catch((e) => errorHandler(e));
      return true;
    } catch (e) {
      errorHandler(e);
    }
  }
};

export default resolvers;
