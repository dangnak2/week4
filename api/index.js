import express from "express";
import posts from "./posts";
import auth from "./auth";

const { sequelize } = require("../models");
const router = express();
const port = 3000;

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

router.use("/auth", auth);
router.use("/posts", posts);



router.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });

export default router;