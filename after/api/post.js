import express from "express";

const router = express();

router.use(express.json());

let movies = [ // movies 배열
  { // movies[0]
    id: 1,
    title: 'Avengers',
  },
  { // movies [1]
    id: 2,
    title: 'Spider-man',
  },
  { // movies [2]
    id: 3,
    title: 'Harry Potter',
  },
];

// /api/post/ 주소로 get요청을 보낼시(body에 id를 포함하였을때) 해당 id인 영화를 보여줍니다.
router.get('/', (req, res) => {  
  const index = movies.findIndex(movie => movie.id === req.body.id);
  if (index === -1) { // 해당 영화가 없다면 error: "That movie does not exist"
    return res.json({
      error: "That movie does not exist",
    });
  }
  res.json(movies.filter(movie => movie.id === req.body.id)[0]);
});

export default router;
