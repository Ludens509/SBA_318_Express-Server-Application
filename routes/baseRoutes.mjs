import express from 'express';

const router = express.Router();


router
  .route("/")
  .get((req, res) => {
    res.send("Testing, Home path");
  })
  .post((req, res) => {
    res.send(`Testing, Post Route`);
  });

router
  .route("/:id")
  .put((req, res) => {
    res.send(`Testing, Put Route: Param value ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Testing, Delete Route: Param Value ${req.params.id}`);
  })
  export default router;