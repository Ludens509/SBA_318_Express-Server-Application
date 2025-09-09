import express from "express";
// import baseRoutes from './routes/baseRoutes.mjs';
import { templateEngineHandler } from "./engineTemplate/templateEngine.mjs";
import globalErrmdware from "./middleware/globalErrHandler.mjs";
import{users,posts,comments} from './utilities/database.mjs'

const app = express();
const port = 3000;

// serve static files from the styles directory
app.use(express.static("./styles"));
app.use(express.static("./script"));


// define the template engine
templateEngineHandler(app);

// app.engine("test", (filePath, options, callback) => {
//   fs.readFile(filePath, (err, content) => {
//     if (err) return callback(err);

//     // Here, we take the content of the template file,
//     // convert it to a string, and replace sections of
//     // it with the values being passed to the engine.
//     const rendered = content
//       .toString()
//       .replaceAll("#title#", `${options.title}`)
//       .replace("#content#", `${options.content}`);
//     return callback(null, rendered);
//   });
// });

//app.set("views", "./views"); // specify the views directory
//app.set("view engine", "test"); // register the template engine

app.get("/posts", (req, res) => {
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
  });

   const options = {
    title: "MiniBlog - Latest Posts",
    content: "Welcome to our minimalist blog",
    postsHtml: postsHtml
  };

  res.render("index", options);
});

// app.use('/',baseRoutes);

//global error handler
app.use(globalErrmdware);




app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
