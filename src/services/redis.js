"use strict";

import redis from "redis";

function initRedis(config) {
  let firstAttempt = true;

  return new Promise((resolve, reject) => {
    if (config.isDev) {
      redis.debug_mode = true;
    }

    const client = redis.createClient(config.redisCache);
    client.on("error", (err) => {
      console.error("Redis error: ", err);

      if (firstAttempt) {
        firstAttempt = false;
        return reject(err);
      }
      return true;
    });

    client.on("ready", () => {
      console.log("Redis ready");
    });

    client.on("connect", () => {
      console.log("Redis connected");

      if (firstAttempt) {
        firstAttempt = false;
        return resolve(client);
      }
      return true;
    });

    client.on("reconnecting", () => {
      console.log("Redis reconnecting");
    });

    client.on("end", () => {
      console.log("Redis disconnected");
    });

    client.on("warning", () => {
      console.log("Redis warning");
    });

    process.on("SIGINT", () => {
      if (client && client.connected) {
        console.log("Redis connection is disconnected due to application termination");
        client.end(true);
      }
    });
  });
}

const objExport = {
  client: null,
  init: null,
};

objExport.init = async function init(config) {
  objExport.client = await initRedis(config);
};

export default objExport;