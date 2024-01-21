

const router = require("express").Router();
const CartController = require("../Controllers/CartController");

const verifyToken = require("../Middlewares/verifyToken");
const RequestBodyMiddleware = require("../Middlewares/RequestBodyMiddleware");



router.get("/usercart", verifyToken , CartController.GetUserCart);

router.delete("/book/:id",verifyToken , CartController.DeleteCartItem);

router.post("/add/:id", [verifyToken,RequestBodyMiddleware ],   CartController.AddToCart)

router.post("/checkout",verifyToken , CartController.Checkout)


router.delete("/delete",verifyToken ,CartController.DeleteCart)







module.exports = router;

