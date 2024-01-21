const {User} = require("../Models/User");

const AdminMiddleware=async (req, res, next)=>{

    const LoggedUserId=req.user.id
    const getUser=await User.findById( LoggedUserId)


    if(getUser.isAdmin){

        return next();
    }

    return res.status(401).send({ msg: "You are not allowed " });



}

module.exports= AdminMiddleware