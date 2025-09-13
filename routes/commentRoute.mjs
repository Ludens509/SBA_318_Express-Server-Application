import express from 'express';

import { comments, users } from '../utilities/database.mjs'

const router = express.Router();



router
    .route("/")
    .get((req, res) => {
        // Generate HTML for all users
        let commentsHtml = '';
        comments.forEach((comment) => {
            const user = users.find((user) => user.id == comment.userId);

            // const usercomments = comment.userId == user.id

            commentsHtml += `<div class="comment">
              <div class="comment-header">
                <div class="comment-meta">
                  <span class="comment-author">${user.name}</span>
                  <span class="comment-date">2 ${new Date().toLocaleDateString()}</span>
                </div>
              </div>
              <div class="comment-content">
                <p>
                  ${comment.body}
                </p>
              </div>
            </div>
              `;
        })
        /*---------------------------------*/
        const options = {
            title: "MiniBlog - All comments",
            content: comments.length,
            commentsHtml: commentsHtml
        };

        res.render("comments", options);
    })

export default router;