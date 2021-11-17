const jwt = require("jsonwebtoken"); // authentication & authorization
const PRIVATE_KEY = require("../privateKey"); // temp private key

function JWTAuthToken(data) {
    if(data._id != null){
        data.email = data._id
    }
    delete data._id

    return (token = jwt.sign(
        { ...data },
        PRIVATE_KEY,
        { expiresIn: 6000 }
    ));
}

function JWTVerify(token) {
    try {
        var decoded = jwt.verify(token,PRIVATE_KEY);
        return ({
            status: 200,
            decoded,
        });
    } catch (err) {
        return ({
            status: 401,
            err,
        })
    }
}

async function AuthMiddleware(req, res, next) {
    if(Object.keys(req.body).length==0)
    {
        req.body=req.query;
    }
    const result = JWTVerify(req.body.token);
    if (result.status !== 200) {
        res.status(401).send(JSON.stringify(result.err));
    } else {
        res.locals.decoded = result.decoded;
        res.locals.newToken = JWTAuthToken({email:result.decoded.email})
        next();
    }
}

module.exports = {JWTAuthToken,AuthMiddleware,JWTVerify };