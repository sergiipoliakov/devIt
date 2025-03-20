import { Request, Response } from 'express';
import { errorHandler } from "../helpers/error.hl";
import { Product as ProductModel } from '../model/product.model';

const resolvers = {
  resolveProducts: async (_: any, __: { req: Request }) => {
    try {
      const products = await ProductModel
        .find()
        .then((products) => products)
        .catch((e) => errorHandler(e));
      return products;
    } catch (e) {
      errorHandler(e);
    }
  },
  resolveProduct: async (args: { productId: any }, __: { req: Request }) => {
    try {
      const { productId } = args;
      const product = await ProductModel
        .findById(productId)
        .then((product) => product)
        .catch((e) => errorHandler(e));
      return product;
    } catch (e) {
      errorHandler(e);
    }
  },
  resolveAddProduct: async (args: { data: { name: string, price: number, stock: number } }, ctx: { req: Request, res: Response }) => {
    try {
      const {
        data: {
          name,
          price,
          stock
        },
      } = args;
      const newProduct = await ProductModel
        .create({
          name,
          price,
          stock
        })
        .then((product) => product)
        .catch((e) => errorHandler(e));
      return newProduct;
    } catch (e) {
      errorHandler(e);
    }
  },
  resolveUpdateProduct: async (args: { data: any }, __: { req: Request }) => {
    try {
      const { data: { productId, price, stock } } = args;
      const product = await ProductModel
        .findByIdAndUpdate(productId, {
          price,
          stock
        })
        .then((product) => product)
        .catch((e) => errorHandler(e));

      return true;
    } catch (e) {
      errorHandler(e);
    }
  }
};

export default resolvers;
