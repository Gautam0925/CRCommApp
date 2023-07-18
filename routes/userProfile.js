const express = require("express");
const router = express.Router();
const uploadImage = require("../multerConfig");

const UserProfile = require("../controllers/userProfile");
const checkAuth = require("../middleware/checkAuthorization");

router.get("/", UserProfile.getAllUserID);
router.get("/:userID", UserProfile.getUserID);
router.post("/", uploadImage.single("userProfileImage"), UserProfile.addUserID);
router.patch("/:userID", UserProfile.updateUserID);
router.delete("/:userID", UserProfile.removeUserID);

module.exports = router;
