"use strict";

import express from "express";

import systemRouter from "./system";
import userRouter from "./user";

const router = express.Router();

router.use("", systemRouter);
router.use("/user", userRouter);

export default router;