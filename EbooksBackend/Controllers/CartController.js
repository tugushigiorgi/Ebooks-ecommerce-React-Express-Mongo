

const {cart} = require('../Models/Cart');
const {User} = require("../Models/User");
const {coupon} = require("../Models/Coupon");




exports.AddToCart = async (req, res) => {
    try {
         const userId =  req.user.id
        const bookId = req.params.id;
         const getuser = await User.findById(userId).populate('books');

        if (! getuser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hasPurchased = ( getuser.books ?? []).some(book => book._id.toString() === bookId);

        if (hasPurchased) {
            return res.status(400).json({ message: 'Book already purchased' });
        }


        const existingCart = await cart.findOne({  userId:userId, books: bookId });

        if (existingCart) {
            return res.status(400).json({ message: 'Book already exists in the cart' });
        }


        const userCart = await cart.findOne({  userId:userId });

        if (!userCart) {

            const newCart = new cart({ userId, books: [bookId] });
            await newCart.save();
        } else {

            userCart.books.push(bookId);
            await userCart.save();
        }

        return res.status(200).json({ message: 'Book added to the cart successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};




exports.DeleteCartItem=async (req,res)=>{

    try{

        const userId =  req.user.id
        const bookId =req.params.id ;


        const userCart = await cart.findOne({  userId:userId });

        if (!userCart) {
            return res.status(404).json({ message: 'User cart not found' });
        }


        const bookExists = userCart.books.includes(bookId);

        if (!bookExists) {
            return res.status(404).json({ message: 'Book not found in the user\'s cart' });
        }


        const updatedCart = await cart.findOneAndUpdate(
            { userId },
            { $pull: { books: bookId } },
            { new: true }
        ).populate('books');

        return res.status(200).json({ message: 'Book removed from the cart successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }





}



exports.DeleteCart=async (req,res)=>{

    try{




        const userId =  req.user.id

        const deletedCart = await cart.findOneAndDelete({  userId:userId });

        if (!deletedCart) {
            return res.status(404).json({ message: 'User cart not found' });
        }

        return res.status(200).json({ message: 'Succesfully deleted' });


    }catch (e){
        console.log(e)
        return res.status(500).send({message: 'Internal Server Error'});



    }



}

exports.GetUserCart=async (req,res)=>{


    try{

        try {

            const userId =  req.user.id
            const userCart = await cart.findOne({  userId:userId }).populate('books');

            const currentUser=await User.findById( userId )

            if (!userCart) {
                return res.status(404).json({ message: 'User cart not found' });
            }


            const CartDto = userCart.books.map(book => ({
                poster: book.poster,
                price: book.price,
                title: book.title,
                id: book._id.toString(),
            }));

            const Dto={

                CartDto:CartDto,
                UserBallance:currentUser.balance.toFixed(2)

            }


            return res.status(200).json({ Dto });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Internal Server Error' });
        }





    }catch (error){

        return res.status(500).send({message: 'Internal Server Error'});

    }





}








exports.Checkout=async (req,res)=>{


    try {

        const userId =  req.user.id
        const {CouponCode, CurrentPrice} = req.body;
        const userCart = await cart.findOne({ userId:userId}).populate('books');
        if (!userCart) {
                return res.status(404).json({message: 'User cart not found'});
            }


            const getuser = await User.findById(userId);

            if (!getuser) {
                return res.status(404).json({message: 'User not found'});
            }

            let totalPrice = userCart.books.reduce((sum, book) => sum + book.price, 0);

            if (CouponCode) {

                console.log(CouponCode)
                const getcoupon = await coupon.findOne({code: CouponCode});

                if (!getcoupon) {
                    return res.status(404).json({message: 'Operation Failed, Double Coupon Check Failed'});
                }

                const discountAmount = (totalPrice * getcoupon.discount) / 100;
                totalPrice -= discountAmount;

                if (CurrentPrice !== totalPrice) {
                    return res.status(400).json({message: 'Operation Failed, Price mismatch'});
                }
            }


            if (getuser.balance >= totalPrice) {

                getuser.balance -= totalPrice;


                getuser.books.push(...userCart.books.map(book => book._id));


                await getuser.save();


                await cart.findOneAndDelete({userId});

                return res.status(200).json({message: 'Checkout successful'});
            } else {
                return res.status(400).json({message: 'Insufficient balance for checkout'});
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send({message: 'Internal Server Error'});
        }




    }













