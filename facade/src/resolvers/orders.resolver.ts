import { Request, Response } from 'express';
import { errorHandler, CustomError } from "../helpers/error.hl";
import { Order as OrderModel } from '../model/orders.model';
import { User as UserModel } from '../model/user.model';
import { Product as ProductModel } from '../model/product.model';

const resolvers = {
  resolveOrder: async (args: { data: { orderId: string } }, __: { req: Request }) => {
    try {
      const { data: { orderId } } = args;

      const order = await OrderModel
        .findById(orderId)
        .then((order) => order)
        .catch((e) => errorHandler(e));
      return order;
    } catch (e) {
      errorHandler(e);
    }
  },
  resolveOrders: async (args: { data: { userId: string } }, __: { req: Request }) => {
    try {
      const { data: { userId } } = args;
      const orders = await OrderModel
      .find({ userId })
      .populate('userId', 'name balance')
      .populate('productId', 'name')
      return orders;
    } catch (e) {
      errorHandler(e);
    }
  },
  resolveAddOrder: async (args: { data: { productId: string, userId: string, quantity: number } }, ctx: { req: Request, res: Response }) => {
    try {
      const {
        data: {
          productId,
          userId,
          quantity
        }
      } = args;

      const userBalance = await UserModel
        .findById(userId)
        .then((user) => user?.balance as number)
        .catch((e) => errorHandler(e));

      const { stock, price } = await ProductModel
        .findById(productId)
        .then((product) => product as { stock: number, price: number })
        .catch((e) => errorHandler(e));

      const isEnoughInStock = stock >= quantity
      if (!isEnoughInStock) throw new CustomError({ message: `In stock less than ${quantity} left`, status: 422 });

      const totalPrice = price * quantity;
      const isEnoughUserBalance = userBalance >= totalPrice;
      if (!isEnoughUserBalance) throw new CustomError({ message: 'user balance is to low!', status: 422 });

      await UserModel
        .findByIdAndUpdate(userId, { balance: userBalance - price * quantity })
        .then((user) => user?.balance as number)
        .catch((e) => errorHandler(e));

      await ProductModel
        .findByIdAndUpdate(productId, { stock: stock - quantity })


      const newOrder = await OrderModel
        .create({
          productId,
          userId,
          quantity,
          totalPrice
        })
        .then((order) => order)
        .catch((e) => errorHandler(e));
      return newOrder;
    } catch (e) {
      errorHandler(e);
    }
  },
  resolveUpdateOrder: async (args: { data: { orderId: string, pruductId: string, userId: string, quantity: number } }, __: { req: Request }) => {
    try {
      const { data: { orderId, pruductId, userId, quantity } } = args;
      await OrderModel
        .findByIdAndUpdate(orderId, {
          pruductId,
          userId,
          quantity
        })
        .catch((e) => errorHandler(e));

      return true;
    } catch (e) {
      errorHandler(e);
    }
  }
};

export default resolvers;
