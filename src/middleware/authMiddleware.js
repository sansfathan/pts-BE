function autMiddleware(req, res, next) {
  console.log("MiddleWare telah di panggil");
  console.log("header :", req.headers);
  if (req?.headers?.authorization === "123") {
    next();
  }
  //  else if(req?.headers?.){}
   else {
    return res.status(401).json({
      status: "fail",
      message: "Token tidak di temukan",
    });
  }
}
module.exports = autMiddleware;
