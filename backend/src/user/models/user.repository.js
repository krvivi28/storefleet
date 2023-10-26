import UserModel from "./user.schema.js";

export const createNewUserRepo = async (user) => {
  return await new UserModel(user).save();
};

export const findUserRepo = async (email) => {
  return await UserModel.findOne({ email }).select("+password");
};
