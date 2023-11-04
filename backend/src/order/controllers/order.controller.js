import {
  createNewOrderRepo,
  findOrderRepo,
  updateProductStock,
} from "../model/order.repository.js";
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
    // orderedItems.forEach(async (productItem) => {
    //   const isItemInStock = await updateProductStock(
    //     productItem.product,
    //     productItem.quantity
    //   );
    //   if (!isItemInStock) {
    //     return next(new ErrorHandler(400, "sorry item is out of stock!!"));
    //   }
    // });
    await createNewOrderRepo(newOrderData);
    res.status(201).json({
      success: true,
      msg: "order placed successfully",
      orderDetails: newOrderData,
    });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const getSingleOrder = async (req, res, next) => {
  try {
    const orderDetasils = await findOrderRepo(req.params.id);
    if (!orderDetasils) {
      return next(new ErrorHandler(400, "order details does'nt exist!"));
    }
    res.status(200).json({ success: true, orderDetasils });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const userOrders = async (req, res, next) => {
  try {
    const orderDetasils = await findOrderRepo(null, {
      user: req.user._id,
    });
    if (!orderDetasils) {
      return next(new ErrorHandler(400, "no orders found"));
    }
    res.status(200).json({ success: true, orderDetasils });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const allPlacedOrders = async (req, res, next) => {
  try {
    const orderDetasils = await findOrderRepo(null, {});
    if (!orderDetasils) {
      return next(new ErrorHandler(400, "no orders found"));
    }
    let totalAmount = 0;
    orderDetasils.forEach((order) => {
      totalAmount += order.totalPrice;
    });
    res.status(200).json({ success: true, totalAmount, orderDetasils });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const updateOrderDetails = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const { orderStatus } = req.body;
    const order = await findOrderRepo(orderId);
    if (!order) {
      return next(new ErrorHandler(400, "no order found"));
    }
    if (order.orderStatus === "Delivered") {
      return next(
        new ErrorHandler(
          400,
          "order has already been deliverd! you can't make changes anymore!!"
        )
      );
    }
    if (orderStatus === "Delivered") {
      order.orderStatus = orderStatus;
      order.deliveredAt = Date.now();
      await order.save({ validateBeforeSave: false }, { new: true });
    }
    if (orderStatus === "Shipped") {
      order.orderStatus = orderStatus;
      await order.save({ validateBeforeSave: false }, { new: true });
    }

    let totalAmount = 0;
    order.orderedItems.forEach((order) => {
      totalAmount += order.totalPrice;
    });
    res.status(200).json({ success: true, totalAmount, order });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};
