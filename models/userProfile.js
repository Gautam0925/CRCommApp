const mongoose = require("mongoose");
require("dotenv").config();

const userProfileSchema = mongoose.Schema(
  {
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String },
    },
    sex: {
      type: String,
      enum: {
        values: ["Male", "Female", "Others", "Can't Say"],
        message: "{VALUE} is not supported",
      },
    },
    dateOfBirth: { type: Date },
    currentProfilePicture: {
      type: String,
      get: (v) => `${process.env.userProfileDirectory}${v}`,
    },
    lastProfilePicture: {
      type: String,
      get: (v) => `${root.userProfileDirectory}${v}`,
    },
    playerTag: { type: String, required: true },
    lastLoginSession: { type: Date },
    lastLoginGeoLocation: {
      Latitude: { type: Number },
      Longitude: { type: Number },
    },
  },
  {
    timestamps: {
      createdAt: "accountCreationDate",
      updatedAt: "accountModificationDate",
    },
  }
);

module.exports = mongoose.model("UserProfile", userProfileSchema);
