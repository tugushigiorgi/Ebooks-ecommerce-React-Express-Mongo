const router = require("express").Router();
const UserController = require("../Controllers/UserController");

const verifyToken = require("../Middlewares/verifyToken");
const RegisterMiddleware = require("../Middlewares/RegisterMiddleware");
const LoginMiddleware = require("../Middlewares/LoginMiddleware");


//router.post("/login", UserController.login);


router.post("/login",LoginMiddleware, UserController.login);
//router.post("/register", UserController.registration);
router.post("/register",RegisterMiddleware, UserController.registration);

router.get("/isadmin",verifyToken,UserController.ChechIfAdmin)


router.get("/headerinfo",verifyToken,UserController.HeaderInfo)

module.exports = router;