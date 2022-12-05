const jwt =require('jsonwebtoken');
const configAuthKey = require('../utils/auth/key');
export const isAuthorizated=async(req,res,next)=>{

    const authHeader= req.headers['authorization'];

    const token = authHeader && authHeader&& authHeader.split(' ')[1];

    console.log(token);
    console.log(configAuthKey);
    const key=configAuthKey.default.secret;
    console.log(key);
    if(token==null)
    {
        return res.status(401).json({});
    }
    else{
        await jwt.verify(token,key,(err,user)=>{
          
            if(err){
                console.log(err);
                return res.status(403).json({});
            }
            else 
            {
                req.user=user;
                return next();
            }
        });

    }

   
    


};