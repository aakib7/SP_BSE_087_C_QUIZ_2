function auth(req,res,next){
    let token = req.header("x-auth-token"); // with req we provide x-auth-token 
    if(!token){
        return res.status(400).send('Token not provided');
    }

    next();
}

module.exports = auth;