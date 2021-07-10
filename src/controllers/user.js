"use strict";

import mongoose from "mongoose";

import userSrv from "../bussiness/user";

const User = mongoose.model("user");

async function create(req, res, next) {
  let data = req.body;

  data.user = data.user.trim();

  const createUser = new User(data);

  try {
    await createUser.save();
  } catch (e) {
    if (e.code === 11000) {
      res.status(400).json({ success: false, error: "Duplicate data" });
      return next(e);
    }
    const error = "[ERROR] create user";
    console.error(error, e);

    res.status(500).json({ success: false, error: "Sorry server error" });
    return next(error);
  }

  res.status(200).json({ success: true });
  return next();
}

async function del(req, res, next) {
  const { userId } = req.params;

  let user;

  try {
    user = await userSrv.findOne({ filter: { _id: userId } });
  } catch (e) {
    const error = "[ERROR] find user";

    console.error(error, e);

    res.status(500).json({ success: false, error: "Sorry server error" });
    return next(error);
  }

  if (!user) {
    const error = "User not found";
    res.status(404).json({ success: false, error });
    return next(error);
  }

  try {
    await User.deleteOne({ _id: userId });
  } catch (e) {
    const error = "[ERROR] delete user";

    console.error(error, e);

    res.status(500).json({ success: false, error: "Sorry server error" });
    return next(error);
  }

  userSrv.delRedis(`user-account-number-${user.accountNumber}`);
  userSrv.delRedis(`user-identity-number-${user.identityNumber}`);

  res.status(200).json({ success: true });
  return next();
}

async function getAccountNumber(req, res, next) {
  const data = req.query;

  const { accountNumber } = data;

  const filter = {
    accountNumber,
  };

  let responseData = {};
  const redisKey = `user-account-number-${accountNumber}`;

  let val;
  try {
    val = await userSrv.getRedisVal(redisKey);
  } catch (e) {
    const error = "[ERROR] redis get value error";
    console.error(error, e);

    res.status(500).json({ success: false, error: "Sorry server error" });
    return next(error);
  }

  if (val) {
    responseData = JSON.parse(val);
  } else {
    let user;

    try {
      user = await userSrv.findOne({ filter });
    } catch (e) {
      const error = "[ERROR] get by account number";
      console.error(error, e);

      res.status(500).json({ success: false, error: "Sorry server error" });
      return next(error);
    }

    if (user) {
      responseData = {
        statusCode: 200,
        data: {
          success: true,
          user,
        },
      };
    } else {
      responseData = {
        statusCode: 404,
        data: {
          success: false,
          error: "Not found",
        },
      };
    }

    userSrv.setRedis(redisKey, JSON.stringify(responseData));
  }

  res.status(responseData.statusCode).json(responseData.data);
  return next();
}

async function getIdentityNumber(req, res, next) {
  const data = req.query;

  const { identityNumber } = data;

  const filter = {
    identityNumber,
  };

  let responseData = {};
  const redisKey = `user-identity-number-${identityNumber}`;

  let val;
  try {
    val = await userSrv.getRedisVal(redisKey);
  } catch (e) {
    const error = "[ERROR] redis get value error";
    console.error(error, e);

    res.status(500).json({ success: false, error: "Sorry server error" });
    return next(error);
  }

  if (val) {
    responseData = JSON.parse(val);
  } else {
    let user;

    try {
      user = await userSrv.findOne({ filter });
    } catch (e) {
      const error = "[ERROR] get by account number";
      console.error(error, e);

      res.status(500).json({ success: false, error: "Sorry server error" });
      return next(error);
    }

    if (user) {
      responseData = {
        statusCode: 200,
        data: {
          success: true,
          user,
        },
      };
    } else {
      responseData = {
        statusCode: 404,
        data: {
          success: false,
          error: "Not found",
        },
      };
    }
  }

  userSrv.setRedis(redisKey, JSON.stringify(responseData));

  res.status(responseData.statusCode).json(responseData.data);
  return next();
}

async function update(req, res, next) {
  const data = req.body;

  const { userId } = req.params;

  let user;

  try {
    user = await userSrv.findOne({ filter: { _id: userId } });
  } catch (e) {
    const error = "[ERROR] find user";

    console.error(error, e);

    res.status(500).json({ success: false, error: "Sorry server error" });
    return next(error);
  }

  if (!user) {
    const error = "User not found";
    res.status(404).json({ success: false, error });
    return next(error);
  }

  if (data.user) {
    data.user = data.user.trim();
  }

  const filter = {
    _id: userId,
  };

  data.modifiedAt = new Date();

  try {
    await userSrv.updateOne({ filter, data });
  } catch (e) {
    if (e.code === 11000) {
      res.status(400).json({ success: false, error: "Duplicate data" });
      return next(e);
    }
    const error = "[ERROR] update user";

    console.error(error, e);

    res.status(500).json({ success: false, error: "Sorry server error" });
    return next(error);
  }

  userSrv.delRedis(`user-account-number-${user.accountNumber}`);
  userSrv.delRedis(`user-identity-number-${user.identityNumber}`);

  res.status(200).json({ success: true });
  return next();
}

export default {
  create,
  del,
  getAccountNumber,
  getIdentityNumber,
  update,
};