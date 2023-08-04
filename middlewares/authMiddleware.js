import JWT  from 'jsonwebtoken';
// middleware is use to protect the route
// protected route tokenhere
// middleware  : when we get the token then only we will send the Response..  whenever we are acquiring the req then next will be validate then only res will be send;
export const requireSignIn  = async (req,res,next) =>{
    try {
        const decode = JWT.verify(req.headers.authorization , process.env.JWT_SECRET
        );
        // phele niche ye decode krke match krehga that the is user is valid or not 
        req.user =decode; 
        next();

    } catch (error) {
        console.log(error);
        res.status(401).send({
            success:false,
            message : "authtoken not recieve"
        })
        
    }
}