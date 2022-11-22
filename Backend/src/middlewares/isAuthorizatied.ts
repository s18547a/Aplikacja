const jwt =require('jsonwebtoken');
const configAuthKey = require('../auth/key');
exports.isAuthorizated=async(req,res,next)=>{

    const authHeader= req.headers['authorization'];

    const token = authHeader && authHeader&& authHeader.split(' ')[1];

    console.log(token);

    if(token==null)
    {
        return res.status(401).json({});
    }
    else{
        await jwt.verify(token,configAuthKey.secret,(err,user)=>{
            console.log(user);
            if(err){
                return res.status(403).json({});
            }
            else 
            {
                req.user=user;
                next();
            }
        });

    }

   
    


};