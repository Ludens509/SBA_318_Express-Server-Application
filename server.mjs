import express from "express";
import postRoutes from './routes/postRoutes.mjs';
import { templateEngineHandler } from "./engineTemplate/templateEngine.mjs";
import globalErrmdware from "./middleware/globalErrHandler.mjs";
import { users, posts, comments } from './utilities/database.mjs'

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



app.use("/", postRoutes);

//global error handler
app.use(globalErrmdware);




app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
