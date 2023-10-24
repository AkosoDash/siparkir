import express from "express";
import user_router from "./user.router.js";
import lahan_parkir_router from "./lahan_parkir.router.js";

const router = express.Router();

router.use("/user/", user_router);
router.use("/lahan-parkir/", lahan_parkir_router);

export default router;
