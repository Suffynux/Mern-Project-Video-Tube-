import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import {
  toggleCommentLike,
  toggleTweetLike,
  toggleVideoLike,
  getLikedVideos,
} from "../controllers/like.controller";

const router = Router();
router.use(verifyJwt);

router.route("/videoId").post(toggleVideoLike)
router.route("/commentId").post(toggleCommentLike)
router.route("/tweetId").post(toggleTweetLike)
router.route("/userId").get(getLikedVideos)

export default router