"use strict";

import Joi from "joi";

const createUser = Joi.object({
  user: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  accountNumber: Joi.number().required(),
  identityNumber: Joi.number().required(),
});

const updateUser = Joi.object({
  user: Joi.string().optional(),
  email: Joi.string().email({ minDomainSegments: 2 }).optional(),
});

const getUserByAccount = Joi.object({
  accountNumber: Joi.number().required(),
});

const getUserByIdentity = Joi.object({
  identityNumber: Joi.number().required(),
});

export default {
  createUser,
  updateUser,
  getUserByAccount,
  getUserByIdentity,
};