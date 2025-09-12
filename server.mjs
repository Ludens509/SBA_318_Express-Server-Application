import express from "express";
import postRoutes from './routes/postRoutes.mjs';
import userRoutes from './routes/userRoutes.mjs'
import { templateEngineHandler } from "./engineTemplate/templateEngine.mjs";
import editPostRoutes from "./routes/editPostRoutes.mjs"
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


app.use("/", postRoutes);
app.use("/users", userRoutes);
app.use("/",editPostRoutes)

//global error handler
app.use(globalErrmdware);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
