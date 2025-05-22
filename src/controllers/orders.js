import { placeOrder } from '../services/orders.js';

export const placeOrderController = async (req, res) => {
  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const orderInfo = {
    ...req.body,
    order_date: formattedDate,
  };

  await placeOrder(orderInfo);

  res.status(201).json({
    status: 201,
    message: 'Order successfully placed',
  });
};
