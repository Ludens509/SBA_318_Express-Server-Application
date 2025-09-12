import express from 'express';

import { users } from '../utilities/database.mjs'

const router = express.Router();



router
  .route("/")
  .get((req, res) => {
    // Generate HTML for all users
    let usersHtml = '';
    users.forEach((user, index) => {
      usersHtml += `

      <article class="user-card">
       <h3 class="user-title">
        <a href="/users/${user.id || index + 1}">${user.name}</a>
        </h3>
        <p class="username">@${user.username}</p>
    

     
        <header class="user-header">
          
          <div class="user-meta">
            <span class="email">Email: <a href="mailto:${user.email}">${user.email}</a></span>
            <span class="join-date">${user.joinDate || new Date().toLocaleDateString()}</span>
          </div>
        </header>
        <div class="user-info">
          <p>Contact: ${user.email}</p>
          <p>${user.bio || 'No bio available'}</p>
        </div>
        <footer class="user-footer">
          <a href="/users/${user.id || index + 1}/edit" class="edit-btn">Edit</a>
          <a href="/users" class="delete-btn">Delete</a>
        </footer>
      </article>
    `;
    })

    /*---------------------------------*/
    const options = {
      title: "MiniBlog - All Users",
      content: "Our users",
      usersHtml: usersHtml
    };

    res.render("users", options);
  })

  export default router;