import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { Tweet } from "../models/tweet.model.js";
import {createTweet} from "../controllers/tweet.controller.js"
const router = Router();
router.use(verifyJwt);

router.route("/tweet").post(createTweet)
export default router;