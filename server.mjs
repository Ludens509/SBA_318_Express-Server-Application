import express from "express";
// import baseRoutes from './routes/baseRoutes.mjs';
import { templateEngineHandler } from "./engineTemplate/templateEngine.mjs";
import globalErrmdware from "./middleware/globalErrHandler.mjs";

const app = express();
const port = 3000;

// serve static files from the styles directory
app.use(express.static("./styles"));


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

app.get("/", (req, res) => {
  const options = {
    title: "Rendering Views with Express",
    content:
      "Here, we've created a basic template engine using <code>app.engine()</code> \
      and the <code>fs</code> module, then used <code>res.render</code> to \
      render this page using custom content within the template.<br><br> \
      Generally, you won't want to create your own view engines, \
      but it important to understand how they work behind the scenes. \
      For a look at some popular view engines, check out the documentation for \
      <a href='https://pugjs.org/api/getting-started.html'>Pug</a>, \
      <a href='https://www.npmjs.com/package/mustache'>Mustache</a>, or \
      <a href='https://www.npmjs.com/package/ejs'>EJS</a>. \
      More complete front-end libraries like React, Angular, and Vue \
      also have Express integrations.",
  };

//   res.render("home", options);
  res.render("index", options);
});

// app.use('/',baseRoutes);

//global error handler
app.use(globalErrmdware);




app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
