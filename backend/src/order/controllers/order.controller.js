import { createNewOrderRepo } from "../model/order.repository.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";

export const createNewOrder = async (req, res, next) => {
  const {
    shippingInfo,
    orderedItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const newOrderData = {
    shippingInfo,
    orderedItems,
    user: req.user._id,
    paidAt: Date.now(),
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  };
  try {
    const newOrder = await createNewOrderRepo(newOrderData);
    res.status(201).json({
      success: true,
      msg: "order placed successfully",
      orderDetails: newOrderData,
    });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};
