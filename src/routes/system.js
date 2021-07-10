"use strict";

import express from "express";
import systemCtrl from "../controllers/system";

const router = express.Router();

router.route("/ok").get(systemCtrl.ok);
router.route("/health").get(systemCtrl.getHealth);

export default router;