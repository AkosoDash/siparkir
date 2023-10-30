import express from "express";
import {
  create_alat_iot,
  delete_alat_iot,
  get_alat_iot,
  get_alat_iot_by_id,
  update_alat_iot,
} from "../controller/alat_iot.controller.js";
import make_callback from "../utils/handle_callback.js";

const alat_iot = express.Router();

alat_iot.get("/", make_callback(get_alat_iot));
alat_iot.get("/:kdAlat/", make_callback(get_alat_iot_by_id));
alat_iot.post("/", make_callback(create_alat_iot));
alat_iot.put("/:kdAlat/", make_callback(update_alat_iot));
alat_iot.delete("/:kdAlat/", make_callback(delete_alat_iot));

export default alat_iot;
