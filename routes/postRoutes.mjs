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
          <a href="/posts/${post.id || index + 1}" class="read-more">edit</a>
          <button  type="button" class="post-tags">
            Delete
          </button>
        </footer>
      </article>
    `;
    })

    //post an item Route
    //@route POST /posts
    //@desc Make a posts
    //@access Public

    


    /*---------------------------------*/
    const options = {
      title: "MiniBlog - Latest Posts",
      content: "Welcome to our minimalist blog",
      postsHtml: postsHtml
    };

    res.render("index", options);
  })
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
        posts.push(post);
        res.json(post);
      } else return res.status(400).json({ msg: ' Please include a title and a content' });
    });



router
  .route("/posts/:id")
  .patch((req, res, next) => {
    const updateData = req.body;
    const post = posts.find((post, i) => {
      if (post.id == req.params.id) {
        for (const key in updateData) {
          if (updateData[key] !== undefined) {
            posts[i][key] = updateData[key];
          }
        }
        return true;
      }
    });
    if (post) {
      res.json(post);
    } else next();
  })
export default router;