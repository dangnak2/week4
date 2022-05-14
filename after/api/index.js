import express from "express";
import post from "./post";
import posts from "./posts";

const router = express();

router.use("/post", post);
router.use("/posts", posts);

export default router;
