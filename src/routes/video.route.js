import { upload } from "../middleware/multer.middleware.js";
import {publishAVideo , getVideoById } from "../controllers/video.controller.js";
import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router();
router.use(verifyJwt) //verify user for all routes in this file
 
router.route("/upload-video").post(
  upload.fields([
    {
      name: "video",
      maxCount: 1,
    },
    {   
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  publishAVideo 
);
 
router.route("/:videoId").get(getVideoById);
export default router;
