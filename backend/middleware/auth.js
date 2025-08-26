import jwt from 'jsonwebtoken';

const authMiddleware=async(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader){
        return res.json({success:false,message:"Not Authorised"});
    }
    const token=authHeader.split(" ")[1];
    
    try{
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId=token_decode.id;
        next();
    }
    catch(err){
        res.json({success:false,message:'Error'});
    }
}
export default authMiddleware;