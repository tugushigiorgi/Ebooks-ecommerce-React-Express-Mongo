const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User} = require("../Models/User");
const {book} = require("../Models/Book");
const {contentDisposition} = require("express/lib/utils");
const {createReadStream} = require("fs");
const {join} = require("path");
const {cart} = require('../Models/Cart');

const genToken = (tokenParams) => {
    const token = jwt.sign(tokenParams, process.env.TOKEN_SECRET, {
        expiresIn: "24h",
    });
    return token;
};

exports.registration = async (req, res) => {
    try {
        const { email, password } = req.body;

        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        const existingUser = await User.findOne({ email: trimmedEmail });

        if (existingUser) {
            return res.status(400).send({ message: "Email already exists. Please choose another email." });
        }

        let isAdmin = false;
            //FOR FIRST REGISTERED USER ADMIN IS TRUE
        const totalUsers = await User.countDocuments();

        if (totalUsers===0) {
             isAdmin = true;
        }

        const encryptedPassword = await bcrypt.hashSync(trimmedPassword, Number(process.env.SALT));

        const user = await User.create({
            email: trimmedEmail,
            password: encryptedPassword,
            balance: 990,
            isAdmin,
        });

        return res.status(200).send({ token: genToken({ id: user._id, email: user.email }) });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Something went wrong" });
    }
};


exports.login = async (req, res) => {



try{


    const { email, password } = req.body;

    const trimmedEmail=email.trim()
    const trimmedPassword=password.trim()

    const foundUser = await User.findOne({ email: trimmedEmail });

    console.log(foundUser)
    if (!foundUser)
        return res.status(401).send({ message: "Incorrect Email or password." });

    const passwordsMatch = await bcrypt.compare(trimmedPassword, foundUser.password);


    if (passwordsMatch) {
        return res.send({
            token: genToken({ id: foundUser.id, email: foundUser.email }),
        });
    }


        return res.status(500).send({ message: "Incorrect Email or password."  });
}catch (error){

    return res.status(500).send("Server errror")
}

};





//User Ballance ,Cart Quantity, IsAdmin
exports.HeaderInfo=async (req,res)=>{


    try{
        const LoggedUserId=req.user.id
    const getUser=await User.findById( LoggedUserId)

    const userCart = await cart.findOne({ userId: LoggedUserId }).populate('books');

    console.error(userCart)
    let CartItemCount;

    if (!userCart) {
        CartItemCount=0
    }else{

        CartItemCount=userCart.books.length
    }

    let Dto={
        isAdmin:getUser.isAdmin,
        cartQauntity:CartItemCount,
        balance:getUser.balance


    }


    return res.status(200).send(Dto)


    }catch (e){
        return res.status(500).send("Internal server error ");
    }






}

exports.ChechIfAdmin=async (req,res)=>{


        try{

            const LoggedUserId=req.user.id
            const getUser=await User.findById( LoggedUserId)

            const isAdmin=getUser.isAdmin

          return res.status(200).send(isAdmin)

        }catch (e){

            return res.status(500).send(e);
        }

}
