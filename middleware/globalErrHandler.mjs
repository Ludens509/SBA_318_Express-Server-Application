// function error(status, msg) {
//   var err = new Error(msg);
//   err.status = status;
//   return err;
// }

// export default error;
export default function globalErrmdware(err, req, res, next) {
  res.status(err.status ||500).json({ msg:` 🩻 Error ${err.message} `});
};