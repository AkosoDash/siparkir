import express from "express";
import { getUsers, getUserById } from "../controller/user.controller.js";
import makeCallback from "../utils/handle_callback.js";

const userRouter = express.Router();

userRouter.get("/", makeCallback(getUsers));
userRouter.get("/:id", makeCallback(getUserById));
userRouter.post("/", makeCallback(getUsers));
userRouter.put("/", makeCallback(getUsers));
userRouter.put("/", makeCallback(getUsers));
userRouter.delete("/", makeCallback(getUsers));

export default userRouter;
