const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Namanisaverygood$$boy';


const fetchuser = (req,res,next) =>{

    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid authtoken 1"})
    }
    try{
        const data=jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();
        } catch(error){
            res.status(401).send({error: "please authenticate using a valid authtoken 2"})
    }
}

module.exports = fetchuser