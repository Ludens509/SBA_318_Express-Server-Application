import fs from 'fs';

export const templateEngineHandler = (app) => {
  app.engine("html", (filePath, options, callback) => {
    fs.readFile(filePath, "utf-8", (err, content) => {
      if (err) return callback(err);
      let rendered = content;
      for (const [key, value] of Object.entries(options)) {
        const regex = new RegExp(`#${key}#`, "g");
        // Handle safely
        let replacement;
        if (value === null || value === undefined) {
          replacement = "";
        } else if (typeof value === "object") {
          // JSON stringify objects & arrays
          replacement = JSON.stringify(value);
        } else {
          replacement = String(value);
        }
        rendered = rendered.replace(regex, replacement);
      }
      return callback(null, rendered);
    });
  });
  app.set("views", "./views");
  app.set("view engine", "html");
};

