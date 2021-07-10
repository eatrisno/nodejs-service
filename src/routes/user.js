"use strict";

import express from "express";
import userCtrl from "../controllers/user";

import validatorsSchema from "../validator/user";

const validator = require("express-joi-validation").createValidator({});

const router = express.Router();

router.route("").post(validator.body(validatorsSchema.createUser), userCtrl.create);
router.route("/:userId").delete(userCtrl.del);
router.route("/:userId").put(validator.body(validatorsSchema.updateUser), userCtrl.update);
router.route("/account").get(validator.query(validatorsSchema.getUserByAccount), userCtrl.getAccountNumber);
router.route("/identity").get(validator.query(validatorsSchema.getUserByIdentity), userCtrl.getIdentityNumber);

export default router;