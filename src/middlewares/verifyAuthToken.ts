import express from "express";
import jwt from "jsonwebtoken";

/**
 * @description Checks if the JWT is valid and has not been tampered with
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
function verifyAuthToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);

    next();
  } catch (error) {
    res.status(401).json("Cannot perform operation: Invalid credentials");
  }
}

export default verifyAuthToken;
