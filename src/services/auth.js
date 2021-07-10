"use strict";

import jwt from "jsonwebtoken";

import config from "../config";

async function valToken(req, res, next) {
  const systemPaths = ["/", "/health", "/ok", "/token"];
  if (systemPaths.includes(req.path)) {
    return next();
  }

  const bearerHeader = req.headers.authorization ? req.headers.authorization : "";

  const bearer = bearerHeader.split(" ");
  const token = bearer[1];

  try {
    jwt.verify(token, config.jwt.secret);
  } catch (e) {
    const error = "No authorization";
    console.error(error, e);
    res.status(403).json({ success: false, error });
    return next(error);
  }

  return next();
}

export default {
  valToken,
};