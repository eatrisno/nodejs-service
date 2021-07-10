"use strict";

import bodyParser from "body-parser";
import express from "express";
import addRequestId from "express-request-id";

import "./models/index";

import config from "./config";
import router from "./routes/index";

import svc_auth from "./services/auth";
import svc_mongodb from "./services/mongodb";
import svc_redis from "./services/redis";

process.title = config.server.name;

const server = express();

server.use(addRequestId());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use("*", (req, res, next) => {
  const data = req.method === "GET" ? req.query : req.body;

  console.log("HTTP", req.method, req.baseUrl, data);

  return next();
});

server.use(svc_auth.valToken);
server.use("", router);

async function init() {
  console.log("Launching node app");

  try {
    await svc_mongodb.init(config);
  } catch (e) {
    const error = "Mongoose - Connection error";
    console.error(error, e);
  }

  try {
    await svc_redis.init(config);
  } catch (e) {
    const error = "Redis - Connection error";
    console.error(error, e);
  }
  const serverInstance = server.listen(config.port, config.host, () => {
    console.log(`${config.server.name.toUpperCase()} v${config.server.version}`);
    console.log(`listening at ${config.host}:${config.port}`);
  });

  process.on("SIGINT", () => {
    console.log("Stopping server");

    serverInstance.close(() => {
      console.log("Server stopped");
      process.exit(0);
    });
  });
}

export default {
  init,
};