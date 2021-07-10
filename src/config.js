"use strict";

import pack from "../package.json";

const env = process.env.NODE_ENV || "development";

export default {
  env,
  isDev: env === "development",

  port: "PORT" in process.env ? (Number(process.env.PORT) + ("NODE_APP_INSTANCE" in process.env ? Number(process.env.NODE_APP_INSTANCE) : 0)) : 8000,
  host: process.env.HOST || (env === "development" ? "0.0.0.0" : "127.0.0.1"),

  server: {
    name: process.env.SERVER_NAME || pack.name,
    version: process.env.SERVER_VERSION || pack.version,
  },

};