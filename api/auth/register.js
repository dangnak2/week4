import express from "express";
import { Auth } from "../../models";
const router = express();

router.use(express.json());

// POST /api/auth/register - 회원가입
router.post("/", async (req, res) => {
    const { email, password } = req.body;

    const index = await Auth.findAll({
        where: {
          email : email,
        }
    });
    
    if(index !== 0){
      return res.json({
        error: "User already exist"
      });
    } else{
      Auth.create({
        email: email,
        password: password,
      });
      return res.json({
          data:{
            user:{
              id: index[0].id,
            }
          }
      });
    }
  });

export default router;
