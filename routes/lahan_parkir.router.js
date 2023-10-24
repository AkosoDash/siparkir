import express from "express";
import {
  get_lahan_parkir,
  get_lahan_parkir_by_id,
  create_lahan_parkir,
  update_lahan_parkir,
  delete_lahan_parkir,
} from "../controller/lahan_parkir.controller.js";
import make_callback from "../utils/handle_callback.js";

const lahan_parkir_router = express.Router();

lahan_parkir_router.get("/", make_callback(get_lahan_parkir));
lahan_parkir_router.get("/:id", make_callback(get_lahan_parkir_by_id));
lahan_parkir_router.post("/", make_callback(create_lahan_parkir));
lahan_parkir_router.put("/:id", make_callback(update_lahan_parkir));
lahan_parkir_router.delete("/:id", make_callback(delete_lahan_parkir));

export default lahan_parkir_router;
