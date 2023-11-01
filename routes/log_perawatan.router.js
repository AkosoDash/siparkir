import express from "express";
import {
  get_log_perawatan,
  get_log_perawatan_by_id,
  create_log_perawatan,
  update_log_perawatan,
  delete_log_perawatan,
} from "../controller/log_perawatan.controller.js";
import make_callback from "../utils/handle_callback.js";

const log_perawatan = express.Router();

log_perawatan.get("/", make_callback(get_log_perawatan));
log_perawatan.get("/:id/", make_callback(get_log_perawatan_by_id));
log_perawatan.post("/", make_callback(create_log_perawatan));
log_perawatan.put("/:id/", make_callback(update_log_perawatan));
log_perawatan.delete("/:id/", make_callback(delete_log_perawatan));

export default log_perawatan;
