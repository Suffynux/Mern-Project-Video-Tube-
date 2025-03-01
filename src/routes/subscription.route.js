import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { toggleSubscription ,getUserChannelSubscribers , getSubscribedChannels } from "../controllers/subscription.controller.js";

const router = Router();
router.use(verifyJwt)

router.route("/toggle/:channelId").post(toggleSubscription)
router.route("/:channelId").get(getUserChannelSubscribers)
router.route("/:subscriberId").get(getSubscribedChannels)
export default router