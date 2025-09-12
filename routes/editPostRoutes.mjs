import express from 'express';
import { users, posts, comments } from '../utilities/database.mjs'

const router = express.Router();

// GET route to show edit form
router.get("/posts/:id/edit", (req, res) => {
    console.log("=== GET EDIT FORM ===");
    console.log("Post ID from params:", req.params.id);
    console.log("Current posts array:", posts);
    
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);
    
    console.log("Looking for post with ID:", postId);
    console.log("Found post:", post);
    
    if (!post) {
        console.log("Post not found, sending 404");
        return res.status(404).send(`
            <h1>Error 404</h1>
            <p>Post not found</p>
            <a href="/posts">Back to Posts</a>
        `);
    }

    const options = {
        title: `Edit: ${post.title}`,
        post: post,
        postId: post.id,
        username: post.username,
        postTitle: post.title,
        postContent: post.content,
    };
    
    console.log("Rendering edit form with options:", options);
    res.render("edit", options);
});

// PUT route to update post and show all posts
router.put("/posts/:id/edit", (req, res, next) => {
    console.log("=== PUT REQUEST RECEIVED ===");
    console.log("Request Method:", req.method);
    console.log("Post ID from params:", req.params.id);
    console.log("Request Body:", req.body);
    console.log("Posts array BEFORE update:", JSON.stringify(posts, null, 2));
    
    const { username, title, content } = req.body;
    const postId = parseInt(req.params.id);
    
    console.log("Extracted form data:", { username, title, content });
    console.log("Parsed Post ID:", postId);
    
    const postIndex = posts.findIndex(post => post.id === postId);
    console.log("Found post at index:", postIndex);
    
    if (postIndex !== -1) {
        console.log("Post found! Current post:", posts[postIndex]);
        
        // Update the existing post with individual fields
        if (username !== undefined && username.trim() !== '') {
            console.log(`Updating username: "${posts[postIndex].username}" -> "${username.trim()}"`);
            posts[postIndex].username = username.trim();
        }
        if (title !== undefined && title.trim() !== '') {
            console.log(`Updating title: "${posts[postIndex].title}" -> "${title.trim()}"`);
            posts[postIndex].title = title.trim();
        }
        if (content !== undefined && content.trim() !== '') {
            console.log(`Updating content: "${posts[postIndex].content}" -> "${content.trim()}"`);
            posts[postIndex].content = content.trim();
        }
        
        //         
        console.log("Post AFTER update:", posts[postIndex]);
        console.log("Posts array AFTER update:", JSON.stringify(posts, null, 2));
        
       
        
    } else {
        console.log("Post not found for update!");
        res.status(404).send(`
            <h1>Error 404</h1>
            <p>Post not found</p>
            <a href="/posts">Back to Posts</a>
        `);
    }
});

// Optional: Add a route to verify posts were updated
router.get("/posts/debug", (req, res) => {
    console.log("=== DEBUG: Current Posts Array ===");
    console.log(JSON.stringify(posts, null, 2));
    res.json(posts);
});



router
  .route("/posts/:id/edit")
  .put((req, res, next) => {
    console.log("PATCH request - ID:", req.params.id, "Body:", req.body);

    const updateData = req.body;
    const postId = parseInt(req.params.id);

    const postIndex = posts.findIndex(post => post.id === postId);

    if (postIndex !== -1) {
      // Update the existing post (don't push it back!)
      for (const key in updateData) {
        if (updateData[key] !== undefined) {
          posts[postIndex][key] = updateData[key];
        }
      }

      // Generate HTML for all posts
      let postsHtml = '';
      posts.forEach((post, index) => {
        postsHtml += `
          <article class="post ${post.id === postId ? 'updated' : ''}">
            <header class="post-header">
              <h3 class="post-title">
                <a href="/posts/${post.id}">${post.title}</a>
              </h3>
              <div class="post-meta">
                <span class="author">By <a href="/users/${post.username || 'anonymous'}">${post.username || 'Anonymous'}</a></span>
                <span class="date">${post.date || new Date().toLocaleDateString()}</span>
              </div>
            </header>
            <div class="post-excerpt">
              <p>${post.content}</p>
            </div>
            <footer class="post-footer">
              <a href="/posts/${post.id}" class="read-more">edit</a>
              <button type="button" class="post-tags">Delete</button>
            </footer>
          </article>
        `;
      });

      const options = {
        title: "Post Updated Successfully",
        postsHtml: postsHtml
      };

      res.render("edit", options);
    } else {
      res.status(404).render("error", {
        title: "Error",
        content: "Post not found"
      });
    }
  });



//   router.put("/posts/:id/edit", (req, res, next) => {
//     console.log("PUT request - ID:", req.params.id, "Body:", req.body);
    
//     const updateData = req.body;
//     const postId = parseInt(req.params.id);
    
//     const postIndex = posts.findIndex(post => post.id === postId);
    
//     if (postIndex !== -1) {
//         // Update the existing post
//         for (const key in updateData) {
//             if (updateData[key] !== undefined) {
//                 posts[postIndex][key] = updateData[key];
//             }
//         }
        
//         // Redirect to posts page with success message
//         res.redirect('/posts/' + postId+'/edit');
//     } else {
//         res.status(404).render("error", {
//             title: "Error",
//             content: "Post not found"
//         });
//     }
// });
export default router;