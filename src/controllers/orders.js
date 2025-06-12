import { placeOrder } from '../services/orders.js';
import { deleteCart } from '../services/cart.js';

export const placeOrderController = async (req, res) => {
  const { _id: userId } = req.user;
  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const orderInfo = {
    ...req.body,
    userId,
    order_date: formattedDate,
  };

  await placeOrder(orderInfo);

  await deleteCart(userId);

  res.status(201).json({
    status: 201,
    message: 'Order successfully placed',
  });
};
