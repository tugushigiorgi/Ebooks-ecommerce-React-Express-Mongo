
const RegisterMiddleware=async (req, res, next)=>{


    try{
        const errors = [];
        for (const prop in req.body) {
            if (!req.body[prop]) {
                return res.status(400).send({ message: "All fields are required" });
            }
        }
        const emailRegex = new RegExp(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        );

        if (!emailRegex.test(req.body["email"])) {
            errors.push("Invalid email");
        }

        if (req.body.password.length < 6) {
            errors.push("Invalid password");
        }

        // if(req.body.password!=req.body.repeatpassword){
        //     errors.push("Password do not match");
        //
        // }




        if (errors.length) return res.status(400).send({ message: errors });
        return next();

    }catch (e){
        res.status(500).send({ message: "Server error " });


    }



}

module.exports=RegisterMiddleware