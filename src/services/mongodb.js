"use strict";

import mongoose from "mongoose";

let config;
const db = mongoose.connection;

let doReconnect = true;
let firstConnectCallback;

function init(cfg) {
  config = cfg;

  if (config.isDev) {
    mongoose.set("debug", true);
  }

  function connectDB() {
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useCreateIndex", true);
    mongoose.set("useFindAndModify", false);
    mongoose.set("useUnifiedTopology", true);
    mongoose.connect(config.mongo.mongoUri);
  }

  db.on("connected", () => {
    console.log(`Mongoose connection is open to ${config.mongoUri}`);

    if (typeof firstConnectCallback === "function") {
      firstConnectCallback();
    }
  });

  db.on("error", (err) => {
    const error = "Mongoose connection has occured";
    console.error(error, err);
    mongoose.disconnect();
    if (typeof firstConnectCallback === "function") {
      firstConnectCallback(err);
    }
  });

  db.on("disconnected", () => {
    console.log("Mongoose connection is disconnected");

    if (doReconnect) {
      console.log("Mongoose will try to restore connection to DB in (second)", 1000);

      const timerId = setTimeout(() => {
        connectDB();
        clearTimeout(timerId);
      }, (config.restoreMongoConnectionIntervalSec * 1000));
    }
  });

  // Graceful Shutdown
  process.on("SIGINT", () => {
    doReconnect = false;
    if (db.readyState) {
      db.close(() => {
        console.log("Mongoose connection is disconnected due to application termination");
        process.exit(0);
      });
    }
  });

  return new Promise((resolve, reject) => {
    firstConnectCallback = (error) => {
      firstConnectCallback = null;

      if (error) {
        return reject(error);
      }

      return resolve(db);
    };

    connectDB();
  });
}

export default {
  db,
  init
};