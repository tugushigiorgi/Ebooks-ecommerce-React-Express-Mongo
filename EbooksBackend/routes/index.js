const router = require("express").Router();
const verifyToken = require("../Middlewares/verifyToken");



const userRouter = require("./UserRouter");

const couponRouter =require("./CouponRouter")
const bookRouter =require("./BookRouter")
const cartRouter=require("./CartRouter")



router.use("/user", userRouter);
router.use("/coupon", couponRouter);
router.use("/book", bookRouter);

router.use("/cart", cartRouter);




module.exports = router;