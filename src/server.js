"use strict";

import bodyParser from "body-parser";
import express from "express";
import addRequestId from "express-request-id";

import config from "./config";
import router from "./routes/index";

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

server.use("", router);

async function init() {
  console.log("Launching node app");

  const serverInstance = server.listen(config.port, config.host, () => {
    console.log(`${config.server.name.toUpperCase()} v${config.server.version} listening at ${config.host}:${config.port}`);
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