const router = require("express").Router();
const BookController = require("../Controllers/BookController");
const multer = require("multer");
const UserController = require("../Controllers/UserController");
const verifyToken = require("../Middlewares/verifyToken");
const AdminMiddleware = require("../Middlewares/AdminMiddleware");

const { upload } = require('../Middlewares/AddBookFileMiddleware');
const RequestBodyMiddleware = require("../Middlewares/RequestBodyMiddleware");

//prefix is book/

router.post("/add",[verifyToken,AdminMiddleware,upload], BookController.AddBook);


router.get("/check/bytitle/:title",BookController.CheckBookByTitle)



router.get("/category/:category",verifyToken,BookController.getBookByCategory)

 
router.get("/filter",verifyToken,BookController.FilterBooks)

router.get("/searchby", verifyToken,BookController.SearchByTitle)





router.get("/:id" ,verifyToken,BookController.getBookById)



router.get("/get/:slug",verifyToken,BookController.getBookByslug)
router.get("/parse/all",[verifyToken,AdminMiddleware],BookController.getAllBook)

router.delete("/:id",[verifyToken,AdminMiddleware],BookController.DeleteBookById)



//router.put("/update/:id"  ,[verifyToken,AdminMiddleware],BookController.UpdateBook)
router.put("/update/:id"  ,[verifyToken,AdminMiddleware,RequestBodyMiddleware],BookController.UpdateBook)




router.get("/update/:id",[verifyToken,AdminMiddleware],BookController.GetBookInfoForUpdate)

router.get("/feed/newbooks",verifyToken,BookController.NewBooks)



router.get("/user/mybooks",verifyToken,BookController.GetUserBooks)

router.get("/read/:id",verifyToken,BookController.getBookFile)

module.exports = router;