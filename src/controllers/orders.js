import { placeOrder } from '../services/orders.js';

export const placeOrderController = async (req, res) => {
  const data = await placeOrder(req.body);

  res.status(201).json({
    status: 201,
    message: 'Order successfully placed',
    data,
  });
};
