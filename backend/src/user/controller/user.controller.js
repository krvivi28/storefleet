import { ErrorHandler } from "../../../utils/errorHandler.js";
import { sendToken } from "../../../utils/sendToken.js";
import { createNewUserRepo, findUserRepo } from "../models/user.repository.js";

export const createNewUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await createNewUserRepo(req.body);
    if (newUser) {
      await sendToken(newUser, res, 200);
    } else {
      return next(new ErrorHandler(400, "invalid details or db error"));
    }
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler(400, "please enter email/password"));
    }
    const user = await findUserRepo(email);
    if (!user) {
      return next(new ErrorHandler(401, "Invalid email or passswor!"));
    }
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return next(new ErrorHandler(401, "Invalid email or passswor!"));
    }
    await sendToken(user, res, 200);
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const logoutUser = async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({ success: true, msg: "logout successful" });
};

export const forgetPassword = async (req, res, next) => {
  try {
    const user = await findUserRepo(req.body.email);
    if (!user) {
      return next(new ErrorHandler(404, "user not found!"));
    }
    const resetToken = await user.getResetPasswordToken();
    console.log(resetToken);

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/storefleet/password/reset/${resetToken}`;
    console.log(resetPasswordUrl);
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};
