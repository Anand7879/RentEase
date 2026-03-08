const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send({ message: "No token found in cookies", success: false });
    }

    jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: "Token is not valid", success: false });
      }

      // ✅ FIX: Set userId in TWO places:
      //   - req.userId  → survives multer (multer rebuilds req.body from FormData fields,
      //                   wiping out anything we set on req.body before upload runs)
      //   - req.body.userId → still works for non-multipart routes (JSON body routes)
      req.userId = decode.id;
      req.body = req.body || {};
      req.body.userId = decode.id;

      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
};

module.exports = { authMiddleware };