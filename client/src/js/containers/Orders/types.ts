interface IOrders {
  userId: {
    name: string;
    balance: number;
  };
  productId: {
    name: string;
  };
  quantity: number;
  totalPrice: number;
  id: string;
}

export type {
  IOrders
};
