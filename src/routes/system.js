"use strict";

import express from "express";
import sys from "../controllers/system";

const router = express.Router();

router.route("/ok").get(sys.ok);
router.route("/health").get(sys.getHealth);
router.route("/token").get(sys.genToken);

export default router;