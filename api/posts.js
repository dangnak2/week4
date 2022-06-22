import express from "express";
import { Posts } from "../models"
import { verifyToken } from "./middlewares";

const router = express();

router.post('/validation', verifyToken, (req, res) =>{
  const {id, password} = req.decode;
  res.json({
    id,
    password
  });
});

// GET /api/posts - 글 목록 조회
router.get("/", (req, res) => {
  const {id, password} = req.decode;
  const index = Posts.findAll({});
  return res.json({
      data : index,
  });
});

// GET /api/posts/:postId - 글 개별 항목 조회
router.get("/:postId", (req, res) => {
    const {id, password} = req.decode;
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
        data : Posts[id]
    });
    }
  });

// POST /api/posts - 글 생성

router.post("/", (req, res) => {
  const writer = req.decoded.id;

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
  const { writer }  = req.decoded.id;
  const modifiedContent = req.body.content;

  const index = Posts.findAll({
      where: {
        id : postId,
        writer : writer
      }
  });

  if (index.length === 0) {
    return res.json({
      error: "Cannot modify post",
    });
  } else{
    Posts.update(
      {
        content : modifiedContent
      },
      {
        where: {
        id : postId,
        writer : index.id
        }
      }
    );
  }

  return res.json({
    data: {
      id: index.id,
    },
  });
});

// DELETE /api/posts/:postId - 특정 글 삭제
router.delete("/:postId", (req, res) => {
  const { postId } = req.params;
  const { writer }  = req.decoded.id;

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
  } else if (index.writer === writer) {
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
