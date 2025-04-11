const jwt = require('jsonwebtoken');
const auth = (req, res,next) => {
    try{
        console.log("Authentication Header::::::::::", req.headers.authorization); // Bearer token
        const token = req.headers.authorization.split(" ")[1];
        console.log("Token::::::::::", token);
        const verificationToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("User ID Value is :::::::::::", verificationToken.userId);
        //req.body.userId = verificationToken.userId;
        req.user = {userId: verificationToken.userId}
        console.log("User ID::::::::::", req.user.userId);
        next();


    }catch(error){
        console.log("Error in auth middleware",error);
        return res.status(500).json({ success: false, message: error.message });
    }
}
module.exports = auth;