import express from "express";

const router = express();

router.use(express.json());

let nextId = 4; // movies 변수에 id를 설정합니다

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

// /api/posts/ - 모든 목록 조회
router.get("/", (req, res) => {
  res.json(movies);
});

// /api/posts/movies주소로 post요청을 보낼시 배열에 새로운 영화를 추가하여줍니다.
router.post('/', (req, res) => { 
  movies.push({
    id: nextId++, // 처음 nextId 4가 들어간후 nextId가 5가 됩니다
    title: req.body.title, // req.body.title이 있어야합니다.
  });
  res.json(movies);
});

// /api/posts/movies주소로 put요청을 보낼시 id에 해당하는 영화를 바꿔줍니다.
router.put('/', (req, res) => {
  const index = movies.findIndex(movie => movie.id === req.body.id);
  if (index === -1) { // 해당 영화가 없을시
    return res.json({
      error: "That movie does not exist",
    });
  }

  movies[index] = {
    id: req.body.id,
    title: req.body.title,
  };
  res.json(movies);
});

// /api/posts/ delete요청을 보낼시 해당 id에 해당하는 영화를 삭제합니다.
router.delete('/', (req, res) => {
  movies = movies.filter(movie => movie.id !== req.body.id);
  res.json(movies);
});

export default router;
