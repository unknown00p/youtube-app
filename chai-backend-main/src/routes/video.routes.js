import { Router } from 'express';
import {
    deleteVideo,
    getAllVideos,
    getAllVideosOfaUser,
    getSearchedVideos,
    getVideoById,
    publishAVideo,
    togglePublishStatus,
    updateVideo,
} from "../controllers/video.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router();
router.use(verifyJWT);
router
    .route("/")
    .get(getAllVideos)
    .post(
        upload.fields([
            {
                name: "videoFile",
                maxCount: 1,
            },
            {
                name: "thumbnail",
                maxCount: 1,
            },

        ]),
        publishAVideo
    );

router.route("/getAllVideosOfaUser").get(getAllVideosOfaUser)
router.route("/toggle/publish/:videoId").patch(togglePublishStatus);

router.route("/searchVideos").get(getSearchedVideos)

router
    .route("/:videoId")
    .get(getVideoById)
    .delete(deleteVideo)
    .patch(upload.single("thumbnail"), updateVideo);

export default router