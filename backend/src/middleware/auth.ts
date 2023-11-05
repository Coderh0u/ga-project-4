import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      decoded?: any;
    }
  }
}

const authNorm = (req: Request, res: Response, next: NextFunction) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", msg: "No token found." });
  }
  const token = (req.headers["authorization"] as any).replace("Bearer ", "");
  if (token) {
    try {
      const accessSecret = process.env.ACCESS_SECRET;
      if (accessSecret) {
        const decoded = jwt.verify(token, accessSecret) as any;
        req.decoded = decoded;

        next();
      } else {
        res.status(403).json({ status: "error", msg: "Token Error" });
      }
    } catch (error) {
      return res.status(401).json({ status: error, msg: "Unauthorised" });
    }
  } else {
    return res.status(403).send({ status: "error", msg: "Forbidden" });
  }
};

const authUser = (req: Request, res: Response, next: NextFunction) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", msg: "No token found." });
  }
  const token = (req.headers["authorization"] as any).replace("Bearer ", "");

  if (token) {
    try {
      const accessSecret = process.env.ACCESS_SECRET;
      if (accessSecret) {
        const decoded = jwt.verify(token, accessSecret) as any;

        if (decoded.role === "user") {
          req.decoded = decoded;
          next();
        } else {
          throw new Error();
        }
      } else {
        res.status(403).json({ status: "error", msg: "Token Error" });
      }
    } catch (error) {
      return res.status(401).json({ status: error, msg: "Unauthorised" });
    }
  } else {
    return res.status(403).send({ status: "error", msg: "Forbidden" });
  }
};

// const authModerator = (req: Request, res: Response, next: NextFunction) => {
//   if (!("authorization" in req.headers)) {
//     return res.status(400).json({ status: "error", msg: "No token found." });
//   }

//   const token = (req.headers["authorization"] as string).replace("Bearer ", "");

//   if (token) {
//     try {
//       const accessSecret = process.env.ACCESS_SECRET;
//       if (accessSecret) {
//         const decoded = jwt.verify(token, accessSecret) as any;

//         // check if personnel logging in has moderator rights
//         if (decoded.role === "moderator") {
//           req.decoded = decoded;
//           next();
//         } else {
//           throw new Error();
//         }
//       } else {
//         res.status(403).json({ status: "error", msg: "Token Error" });
//       }
//     } catch (error) {
//       return res.status(401).json({
//         status: error,
//         msg: "Unauthorised, please contact our moderators.",
//       });
//     }
//   } else {
//     return res.status(403).send({ status: "error", msg: "Forbidden" });
//   }
// };

const authVendor = (req: Request, res: Response, next: NextFunction) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", msg: "No token found." });
  }

  const token = (req.headers["authorization"] as string).replace("Bearer ", "");

  if (token) {
    try {
      const accessSecret = process.env.ACCESS_SECRET;
      if (accessSecret) {
        const decoded = jwt.verify(token, accessSecret) as any;

        // check if personnel logging in has vendor rights
        if (decoded.role === "vendor") {
          req.decoded = decoded;
          next();
        } else {
          throw new Error();
        }
      } else {
        res.status(403).json({ status: "error", msg: "Token Error" });
      }
    } catch (error) {
      return res.status(401).json({ status: error, msg: "Unauthorised" });
    }
  } else {
    return res.status(403).send({ status: "error", msg: "Forbidden" });
  }
};

export {
  authNorm,
  authUser,
  //authModerator,
  authVendor,
};
