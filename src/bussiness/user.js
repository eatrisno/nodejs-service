"use strict";

import mongoose from "mongoose";

import cacheSrv from "../services/redis";
import config from "../config";

const User = mongoose.model("user");

function findOne({ filter }) {
  return new Promise((resolve, reject) => {
    User.findOne(filter, (err, user) => {
      if (err) {
        return reject(err);
      }
      return resolve(user);
    });
  });
}

function updateOne({ filter, data }) {
  return new Promise((resolve, reject) => {
    User.updateOne(filter, { $set: data }, (err, user) => {
      if (err) {
        return reject(err);
      }
      return resolve(user);
    });
  });
}

function getRedisVal(redisKey) {
  return new Promise((resolve, reject) => { // eslint-disable-line consistent-return
    cacheSrv.client.get(redisKey, (err, val) => {
      if (err) {
        return reject(err);
      }
      return resolve(val);
    });
  });
}

function setRedis(redisKey, val) {
  cacheSrv.client.set(redisKey, val, "EX", config.redis.redisCache.expired);
}

function delRedis(redisKey) {
  cacheSrv.client.del(redisKey);
}

export default {
  findOne,
  updateOne,
  setRedis,
  getRedisVal,
  delRedis,
};