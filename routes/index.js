import express from "express";
import user_router from "./user.router.js";
import lahan_parkir_router from "./lahan_parkir.router.js";
import parkir_router from "./parkir.router.js";
import log_perawatan from "./log_perawatan.router.js";
import alat_iot from "./alat_iot.router.js";

const router = express.Router();

router.use("/user/", user_router);
router.use("/lahan-parkir/", lahan_parkir_router);
router.use("/parkir/", parkir_router);
router.use("/log-perawatan/", log_perawatan);
router.use("/alat-iot/", alat_iot);

export default router;
