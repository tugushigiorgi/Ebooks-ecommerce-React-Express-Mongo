




const RequestBodyMiddleware=async (req, res, next)=>{


    try{
        const errors = [];
        for (const prop in req.body) {
            if (!req.body[prop]) {
                return res.send({ message: "All fields are required" });
            }
        }




        if (errors.length) return res.status(400).send({ message: errors });
        return next();


    }catch (e){



    }



}

module.exports=RequestBodyMiddleware