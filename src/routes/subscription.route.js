import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { toggleSubscription } from "../controllers/subscription.controller.js";

const router = Router();
router.use(verifyJwt)

router.route("/toggle/:channelId").post(toggleSubscription)
export default router