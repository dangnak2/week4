import express from "express";

const router = express();

router.use(express.json());

let nextId = 4;

let postData = [
  {
    id: 1,
    email: "test@email.com",
    password: "password1",
  },
  {
    id: 2,
    email: "test2@email.com",
    password: "password2",
  },
  {
    id: 3,
    email: "test3@email.com",
    password: "password3",
  },
];

// POST /api/auth/login - 로그인
router.post("/", (req, res) => {
    const { email, password } = req.body;
    const index = postData.findIndex((post) => post.email === email);
    const postCount = postData.push({
      id: nextId++,
      email : email,
      password: password,
    });
    if(index !== -1){
        return res.json({
            data: {
              post: {
                id: postCount,
              },
            },
          });
    }
    return res.json({
      error : "User not exist"
    });
  });



export default router;
