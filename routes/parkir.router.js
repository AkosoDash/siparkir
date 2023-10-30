import express from "express";
import {
  get_data_parkir,
  get_data_parkir_by_id,
  guest_in,
  guest_out,
} from "../controller/parkir.controller.js";
import make_callback from "../utils/handle_callback.js";

const parkir_router = express.Router();

parkir_router.get("/:kdLahanParkir", make_callback(get_data_parkir));
parkir_router.get(
  "/:kdLahanParkir/:idParkir",
  make_callback(get_data_parkir_by_id)
);
parkir_router.post("/guest-in/:kdLahanParkir", make_callback(guest_in));
parkir_router.post("/guest-out/:kdLahanParkir", make_callback(guest_out));

export default parkir_router;
