import express from "express";
import post from "./post";
import posts from "./posts";
import auth from "./auth";

const router = express();

router.use("/post", post);
router.use("/posts", posts);
router.use("/auth", auth);

export default router;
