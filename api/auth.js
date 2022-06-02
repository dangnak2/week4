import { Router } from 'express';
import { Auth } from "../models";
import { jwt } from 'jsonwebtoken';
import { verifyToken } from './middlewares';
const bcrypt = require('bcrypt');

const router = Router();

// POST /api/auth/login - 로그인
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  
  let index = Auth.findAll({
    where: { 
      email: email,
      password : password,
     }
  });
  if(index){
    const isPass = Auth.findAll({
      where: {
        email : email,
        password : password,
      }
    });

    if(isPass){
      const token = jwt.sign({
        email : req.body.email,
        password : req.body.password,
      }, process.env.JWT_SECRET, {
        expiresIn : '10m',
        issuer : 'JWT_study',
      });

      return res.json({
        code: 200,
        message: '토큰이 발급되었습니다',
        token,
      });
    }
  }
 
});


// POST /api/auth/register - 회원가입
router.post("/register", (req, res) => {
  const { email, password } = req.body;

  const index = Auth.findAll({
      where: {
        email : email,
        password : password
      }
  });
  
  if(index){
    return res.json({
      error : "이미 존재하는 이메일 입니다. "
    });
  } else{
    const hash = bcrypt.hash(password, 10);
    const user_data = Auth.create({
      email : email,
      password : hash,
    });
    return res.json({
        data: {
          user: {
            id: user_data.id
          }
        },
    });
  }
});

export default router;