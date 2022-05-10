import express from "express";
import post from "./post";

const router = express();

router.use("/post", post);

export default router;
