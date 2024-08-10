import AppError from "../utils/errorUtil.js";
import JWT from "jsonwebtoken";
// import role from '../models/courseModel.js'

const isLoggedIn = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError("Unauthonticated, Please Login Again", 400));
  }

  const userDeatils = await JWT.verify(token, process.env.JWT_SECRET);

  req.user = userDeatils;

  next();
};

////////////////////////////////////////////////

const authorizedRoles =
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

///////////////////////////////////////////////////////////////

const authorizedSubscriber = async (req, res, next) => {
  const subscription = req.user.subscription;
  const currentUserRole = req.user.role;
  if (currentUserRole !== "ADMIN" && subscription.status !== "active") {
    return next(new AppError("Please subscribe to access this route", 400));
  }
};

//Exproting...............
export { isLoggedIn, authorizedRoles, authorizedSubscriber };
