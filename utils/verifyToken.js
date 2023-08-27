import jwt from 'jsonwebtoken'
import { errorCreate } from './error.js'


export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return next(errorCreate(401, "You are not authenticated!"));
    }
  
    jwt.verify(token, process.env.JWT_SEC_KEY, (err, user) => {
      if (err) return next(errorCreate(403, "Token is not valid!"));
      req.user = user;
      next();
    });
  };

  export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
      if (req.user.id === req.params.id || req.user.isadmin) {
        next();
      } else {
        return next(createError(403, "You are not authorized!"));
      }
    });
  };
  
  