import express from "express";
import { Posts } from "../models"

const router = express();

router.use(express.json());

// GET /api/posts - 글 목록 조회
router.get("/", (req, res) => {
  const index = Posts.findAll({});
  return res.json({
      data : index,
  });
});

// GET /api/posts/:postId - 글 개별 항목 조회
router.get("/:postId", (req, res) => {
    const { postId } = req.params;

    const index = Posts.findAll({
      where : postId,
    });

    if(postId.length === 0 ){
      return res.json({
        error: "Post not exist",
      });
    } else{
      return res.json({
        data : index[0],
    });
    }
  });

// POST /api/posts - 글 생성
router.post("/", (req, res) => {
  const { writer } = req.header('X-User-Id');

  const index = Posts.create({
      content : req.body.content,
      writer : writer,
  });

  return res.json({
    data: {
      post: {
        id: index.id,
      },
    },
  });
});

// PUT /api/posts/:postId - 특정 글 수정
router.put("/:postId", (req, res) => {
  const { postId } = req.params;
  const { writer }  = req.header('X-User-Id');

  const index = Posts.findAll({
      id : postId,
  });

  if (index.length === 0) {
    return res.json({
      error: "Cannot modify post",
    });
  }

  if (index[0].writer === writer) {
    Posts.update({
        content : req.body.content,
    });
  }

  return res.json({
    data: {
      id: index[0].id,
    },
  });
});

// DELETE /api/posts/:postId - 특정 글 삭제
router.delete("/:postId", (req, res) => {
  const { postId } = req.params;
  const { writer }  = req.header('X-User-Id');

  // const index = postData.findIndex((post) => post.id === postId);
  const index = Posts.findAll({
    where: {
      id : postId,
    }
  });

  if (index === 0) {
    return res.json({
      error: "Cannot delete post",
    });
  }

  else if (index[0].writer === writer) {
    Posts.destroy({
      where:{
        id : postId,
      }
    });
  }

  return res.json({
    data: "Successfully deleted",
  });
});

export default router;
