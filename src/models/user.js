"use strict";

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  user: { type: String, trim: true, unique: true },
  email: {
    type: String, trim: true, lowercase: true, unique: true,
  },

  accountNumber: { type: Number, trim: true, unique: true },
  identityNumber: { type: Number, trim: true, unique: true },

  modifiedAt: { type: Date, default: Date.now, select: false },
  createdAt: { type: Date, default: Date.now, select: false },
}, { versionKey: false });

mongoose.model("user", UserSchema);