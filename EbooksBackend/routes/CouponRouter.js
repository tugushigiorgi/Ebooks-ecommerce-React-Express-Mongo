const router = require("express").Router();

const CouponController = require("../Controllers/CouponController");
const verifyToken = require("../Middlewares/verifyToken");
const RegisterMiddleware = require("../Middlewares/RegisterMiddleware");
const RequestBodyMiddleware = require("../Middlewares/RequestBodyMiddleware");

// router.post("/login", UserController.login);


 router.post("/add",   [verifyToken,RequestBodyMiddleware], CouponController.AddCoupon);


 router.get("/all", verifyToken,CouponController.getCoupons)


router.delete("/delete/:id",verifyToken,CouponController.DeleteCoupon);

router.post("/code/:couponcode",verifyToken,CouponController.getCouponByCode);


router.get("/random",verifyToken,CouponController.getRandomCoupon)


module.exports = router;