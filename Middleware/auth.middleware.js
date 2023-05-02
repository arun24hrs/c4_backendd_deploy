const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    // console.log(res.body, "body", token);
    jwt.verify(token, "social" , function(err, decoded) {
        if(decoded){
            req.body.authorId = decoded.authorId
            req.body.authorName = decoded.authorName
            next()

        } else if(err){
            res.status(400).send({msg: "Please login first"})
        }
      });
}

module.exports = auth;
