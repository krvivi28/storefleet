import OrderModel from "./order.schema.js";
import ProductModel from "../../product/model/product.schema.js";
export const createNewOrderRepo = async (data) => {
  return await new OrderModel(data).save();
};
export const findOrderRepo = async (id = null, factor = null) => {
  if (id) return await OrderModel.findById(id).populate("user", "name email");
  else return await OrderModel.find(factor).populate("user", "name email");
};

export const updateProductStock = async (productId, quantity) => {
  const product = await ProductModel.findById(productId);
  if (product) {
    product.stock -= quantity;
    if (product.stock >= 0) {
      await product.save({ validateBeforeSave: false });
      return product;
    } else {
      return false;
    }
  }
};
