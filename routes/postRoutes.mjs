import express from 'express';

import { users, posts, comments } from '../utilities/database.mjs'

const router = express.Router();



//@route GET /posts
//@desc read through posts
//@access Public
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
            <span class="author">By <a href="/users/${post.username || 'anonymous'}">${post.username || 'Anonymous'}</a></span>
            <span class="date">${post.date || new Date().toLocaleDateString()}</span>
            <span class="comments-count">${post.comments || 0} comments</span>
          </div>
        </header>
        <div class="post-excerpt">
          <p>${post.content}</p>
        </div>
        <footer class="post-footer">
          <a href="/posts/${post.id || index + 1}/edit" class="read-more">edit</a>
          <a  href="/posts" class="post-tags">
            Delete
          <a>
        </footer>
      </article>
    `;
    })


    /*---------------------------------*/
    const options = {
      title: "MiniBlog - Latest Posts",
      content: "Welcome to our minimalist blog",
      postsHtml: postsHtml
    };

    res.render("index", options);
  })

  //post an item Route
  //@route POST /posts
  //@desc Make a posts
  //@access Public


  .post((req, res) => {
    const { username, title, content } = req.body;

    if (username && title && content) {
      // if (users.find((user) => user.name == name)) {

      // }
      if (posts.find((post) => post.title == title)) {
        res.json({ msg: `🩻 Error - Post title already exist` });
        return;
      }

      const post = {
        id: posts[posts.length - 1].id + 1,
        username: username,
        title: title,
        content: content
      }
      posts.unshift(post);


      let postsHtml = '';
      posts.forEach((post, index) => {
        postsHtml += `
      <article class="post">
        <header class="post-header">
          <h3 class="post-title">
            <a href="/posts/${post.id || index + 1}">${post.title}</a>
          </h3>
          <div class="post-meta">
            <span class="author">By <a href="/users/${post.username || 'anonymous'}">${post.username || 'Anonymous'}</a></span>
            <span class="date">${post.date || new Date().toLocaleDateString()}</span>
            <span class="comments-count">${post.comments || 0} comments</span>
          </div>
        </header>
        <div class="post-excerpt">
          <p>${post.content}</p>
        </div>
        <footer class="post-footer">
          <a href="/posts/${post.id || index + 1}" class="read-more">edit</a>
          <a href="/posts"  type="button" class="post-tags">
            Delete
          </a>
        </footer>
      </article>
    `;
      })

      const options = {
        title: "MiniBlog - Latest Posts",
        content: "Welcome to our minimalist blog",
        postsHtml: postsHtml
      };

      res.render("index", options);
      // res.json(post);
    } else {
      return res.status(400).json({
        msg: 'Please include username, title and content',
        received: { username, title, content }
      });
    }
  });






// /---------------------------------

router.delete("/posts/:id/delete", (req, res) => {
  console.log("=== GET EDIT FORM ===");
  console.log("Post ID from params:", req.params.id);
  console.log("Current posts array:", posts);

  const postId = parseInt(req.params.id);
  const postIndex = posts.find(p => p.id === postId);

  console.log("Looking for post with ID:", postId);
  console.log("Found post:", postIndex);

  if (!postIndex) {
    console.log("Post not found, sending 404");
    return res.status(404).send(`
            <h1>Error 404</h1>
            <p>Post not found</p>
            <a href="/posts">Back to Posts</a>
        `);
  }

  // Remove the post from the array
  posts.splice(postIndex, 1);

  let postsHtml = '';
  posts.forEach((post, index) => {
    postsHtml += `
      <article class="post">
        <header class="post-header">
          <h3 class="post-title">
            <a href="/posts/${post.id || index + 1}">${post.title}</a>
          </h3>
          <div class="post-meta">
            <span class="author">By <a href="/users/${post.username || 'anonymous'}">${post.username || 'Anonymous'}</a></span>
            <span class="date">${post.date || new Date().toLocaleDateString()}</span>
            <span class="comments-count">${post.comments || 0} comments</span>
          </div>
        </header>
        <div class="post-excerpt">
          <p>${post.content}</p>
        </div>
        <footer class="post-footer">
          <a href="/posts/${post.id || index + 1}" class="read-more">edit</a>
          <a href="/posts"  type="button" class="post-tags">
            Delete
          </a>
        </footer>
      </article>
    `;
  })

  const options = {
    title: "MiniBlog - Latest Posts",
    content: "Welcome to our minimalist blog",
    postsHtml: postsHtml
  };

  res.render("index", options);


});
export default router;