"use strict";

import express from "express";

import systemRouter from "./system";

const router = express.Router();

router.use("", systemRouter);

export default router;