import express from 'express';

import{users,posts,comments} from '../utilities/database.mjs'

const router = express.Router();


router
  .route("/posts")
  .get((req, res) => {
  // Generate HTML for all posts
  let postsHtml = '';
  
  posts.forEach((post, index) => {
    postsHtml += `
      <article class="post">
        <header class="post-header">
          <h3 class="post-title">
            <a href="/posts/${post.id || index + 1}">${post.title}</a>
          </h3>
          <div class="post-meta">
            <span class="author">By <a href="/users/${post.author || 'anonymous'}">${post.author || 'Anonymous'}</a></span>
            <span class="date">${post.date || new Date().toLocaleDateString()}</span>
            <span class="comments-count">${post.comments || 0} comments</span>
          </div>
        </header>
        <div class="post-excerpt">
          <p>${post.content}</p>
        </div>
        <footer class="post-footer">
          <a href="/posts/${post.id || index + 1}" class="read-more">edit</a>
          <button  type="button" class="post-tags">
            Delete
          </button>
        </footer>
      </article>
    `;
  })
  .post((req,res)=>{
    
  });

   const options = {
    title: "MiniBlog - Latest Posts",
    content: "Welcome to our minimalist blog",
    postsHtml: postsHtml
  };

  res.render("index", options);
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