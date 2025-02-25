import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshAccessToken,
  resetPassword,
  getCurrentUser,
  updateUserDetails,
  updateAvator,
  getUserChannelProfile,
  getWatchHistory,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import multer from "multer";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser,
);

router.route("/login").post(loginUser);
// router.route("/logout").post(logoutUser)

//Secured routes
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/refreshtoken").post(refreshAccessToken);
router.route("/changePassword").post(verifyJwt, resetPassword);
router.route("/current-user").get(verifyJwt, getCurrentUser);
router.route("/update-userprofile").patch(verifyJwt, updateUserDetails);
router.route("/avatar").post(verifyJwt, upload.single("avatar"), updateAvator);
router.route("/c/:/username/").get(verifyJwt, getUserChannelProfile);
router.route("/watch-history").get(verifyJwt, getWatchHistory);

export default router;
