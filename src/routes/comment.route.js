import { Router } from "express";
import { updateComment , deleteComment , addComment , getAllComments} from "../controllers/comment.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
const router = Router();
router.use(verifyJwt)

router.route("/:videoId").post(addComment)
router.route("/c/:videoId").get(getAllComments)
router.route("/c/:commentId").patch(updateComment)
router.route("/c/:commentId").delete(deleteComment)

export default router