import { ErrorHandler } from "../utils/errorHandler.js";

export const errorHandlerMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal server error";
  err.statusCode = err.statusCode || 500;
  console.log(err.name);
  // if (err.name === "CastError") {
  //   err = new ErrorHandler(400, `Resource not found!. Invlid ${err.path} `);
  // }
  res.status(err.statusCode).json({ succes: false, error: err.message });
};

// module.exports = (theFunc) => (req, res, next) => {
//   Promise.resolve(theFunc(req, res, next)).catch(next);
// };

// handling handleUncaughtError  Rejection
export const handleUncaughtError = () => {
  process.on("uncaughtException", (err) => {
    console.log(`Error: ${err}`);
    console.log("shutting down server bcz of uncaughtException");
  });
};
