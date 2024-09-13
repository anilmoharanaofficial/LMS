import AppError from "../utils/AppError.js";
import JWT from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError("Unauthonticated, Please Login Again", 400));
  }

  const userDetails = await JWT.verify(token, process.env.JWT_SECRET);
  req.user = userDetails;

  next();
};

const authorized =
  (...roles) =>
  async (req, res, next) => {
    try {
      const currentUserRole = req.user.role;

      if (!roles.includes(currentUserRole)) {
        return next(
          new AppError("You do not have permission to access this route", 403)
        );
      }
      next();
    } catch (error) {
      return next(
        new AppError(error.message, "Fetch Authorized Roles Failed", 400)
      );
    }
  };

export { isLoggedIn, authorized };
