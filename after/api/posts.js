import express from "express";

const router = express();

router.use(express.json());

let nextId = 4;

let postData = [
  {
    id: 1,
    content: "대충 글 내용 1",
    writer: 1,
  },
  {
    id: 2,
    content: "대충 글 내용 2",
    writer: 2,
  },
  {
    id: 3,
    content: "대충 글 내용 3",
    writer: 3,
  },
];

// GET /api/posts - 글 목록 조회
router.get("/", (req, res) => {
  return res.json({
    data: postData,
  });
});

// GET /api/posts/:postId - 글 개별 항목 조회
router.get("/:postId", (req, res) => {
    const { postId } = req.params;
    if (!postData[postId - 1]) {
      return res.json({
        error: "Post not exist",
      });
    }
    return res.json({
      data: postData[postId - 1],
    });
  });

// POST /api/posts - 글 생성
router.post("/", (req, res) => {
  const { userId } = req.param('X-User-Id');
  const { id, content } = req.body;
  const postCount = postData.push({
    id: nextId++,
    content,
    writer: userId,
  });
  return res.json({
    data: {
      post: {
        id: postCount,
      },
    },
  });
});

// PUT /api/posts/:postId - 특정 글 수정
router.put("/:postId", (req, res) => {
  // const { userId, content, postId } = req.body;
  const { postId } = req.params;
  const userId  = req.header('X-User-Id');
  const { content } = req.body;
  const index = postData.findIndex((post) => post.id === postId);

  if (index === -1) {
    return res.json({
      error: "Cannot modify post",
    });
  }

  if (!(postData[index].writer === userId)) {
    return res.json({
      error: "Cannot modify post",
    });
  }

  postData[index].content = content;

  return res.json({
    data: {
      id: postData[index].id,
    },
  });
});

// DELETE /api/posts/:postId - 특정 글 삭제
router.delete("/:postId", (req, res) => {
  const { postId } = req.params;
  const userId  = req.header('X-User-Id');
  const index = postData.findIndex((post) => post.id === postId);

  if (index === -1) {
    return res.json({
      error: "Cannot delete post",
    });
  }

  if (!(postData[index].writer === userId)) {
    return res.json({
      error: "Cannot delete post",
    });
  }

  postData = postData.filter((post) => post.id !== postId);
  return res.json({
    data: "Successfully deleted",
  });
});

export default router;
