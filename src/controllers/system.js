"use strict";

import config from "../config";

function ok(req, res, next) {
  res.status(200).json({ success: true });
  return next();
}

function getHealth(req, res, next) {
  const info = {
    pid: process.pid,
    name: config.server.name.toUpperCase(),
    version: config.server.version,
    port: config.port,
    uptimeSec: process.uptime(),
  };

  res.status(200).json(info);
  return next();
}

export default {
  ok,
  getHealth,
};