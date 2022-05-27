import express from "express";
import { Auth } from "../../models";

const router = express();

router.use(express.json());

// POST /api/auth/login - 로그인
router.post("/", (req, res) => {
    const { email, password } = req.body;
    
    let index = Auth.findAll({
      where: { 
        email: email,
        password : password,
       }
    });

    if(index.length === 0){
      return res.json({
        error: "User not exist",
      });
    } else{
      return res.json({
        data: {
            user: {
              id: index[0].id,
            }
        },
      });
    }
  });

export default router;
