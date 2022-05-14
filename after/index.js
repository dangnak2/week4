import express from "express";
import api from "./api";

const router = express();
const port = 3000;

router.use("/api", api);

router.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });

export default router;