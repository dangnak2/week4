import express from "express";
import Posts from "./posts";
import Auth from "./auth";

const router = express();

app.use("/posts", Posts);
app.use("/auth", Auth);

export default router;