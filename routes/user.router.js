import express from "express";
import {
  get_user,
  get_user_by_id,
  change_password,
  login_user,
} from "../controller/user.controller.js";
import make_callback from "../utils/handle_callback.js";

const user_router = express.Router();

user_router.get("/", make_callback(get_user));
user_router.get("/:id", make_callback(get_user_by_id));
user_router.put("/change-password/:id", make_callback(change_password));
user_router.post("/login", make_callback(login_user));

export default user_router;
