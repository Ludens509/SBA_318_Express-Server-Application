import express from "express";
import { templateEngineHandler } from "./engineTemplate/templateEngine.mjs";
import globalErrmdware from "./middleware/globalErrHandler.mjs";
import editPostRoutes from "./routes/editPostRoutes.mjs";
import postRoutes from './routes/postRoutes.mjs';
import userRoutes from './routes/userRoutes.mjs';
import commentsRoutes from './routes/commentRoute.mjs'

const app = express();
const port = 3000;

//Middleware
// app.use(express.json);
app.use(express.urlencoded({ extended: true }));

// serve static files from the styles directory
app.use(express.static("./styles"));
app.use(express.static("./script"));


// define the template engine
templateEngineHandler(app);


app.use("/", postRoutes);
app.use("/users", userRoutes);
app.use("/comments", commentsRoutes);
app.use("/",editPostRoutes)


// / Adding some HATEOAS links.
app.get("/", (req, res) => {
  res.json({
    links: [
      {
        href: "/api/comments",
        rel: "comments",
        type: "GET",
      },
      {
        href: "/api/comments",
        rel: "comments",
        type: "POST",
      },
      {
        href: "/posts",
        rel: "posts",
        type: "POST",
      },
      {
        href: "/posts",
        rel: "posts",
        type: "GET",
      },
      {
        href: "/posts",
        rel: "users",
        type: "GET",
      },
      {
        href: "//posts/:id/edit",
        rel: "api",
        type: "GET",
      },
    
      {
        href: "//posts/:id/edit",
        rel: "api",
        type: "PUT",
      },
      {
        href: "//posts/:id/delete",
        rel: "api",
        type: "DELETE",
      },
    ],
  });
});

//global error handler
app.use(globalErrmdware);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
