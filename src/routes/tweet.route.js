import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { Tweet } from "../models/tweet.model.js";
import {createTweet , getUserTweets , updateTweet , deleteTweet } from "../controllers/tweet.controller.js"
const router = Router();
router.use(verifyJwt);

router.route("/tweet").post(createTweet)
router.route("/user-tweet").get(getUserTweets)
router.route("/user-tweet/:tweetId").patch(updateTweet)
router.route("/user-tweet/:tweetId").delete(deleteTweet)
export default router;