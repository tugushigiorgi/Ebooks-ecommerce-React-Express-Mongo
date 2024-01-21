
const {book} = require("../Models/Book");
const {User} = require("../Models/User");
const { diskStorage} = require("multer");
const multer = require("multer");
const {existsSync, createReadStream} = require("fs");
const {  join} = require("path");
const {coupon} = require("../Models/Coupon");
const {get, Types} = require("mongoose");
const {cart} = require('../Models/Cart');
const fs = require('fs');
const path = require('path');



exports.AddBook = async (req, res) => {
    try {

           const { title, description, category, price  } = req.body;

             // Doing this primitive check  instead of middleware because it is form data and before this controller
             // upload middleware handles it and before that all fields are undefined :) EXPRESS
            if(!title && !description && !category && !price){

                return res.status(400).send({ message: 'Bad request' });
            }


           //from middlware   AdddBookFileMiddleware populated
            const {posterFileName,bookFileFileName}=req
            const slug = title.replace(/\s+/g, '-').toLowerCase();
            const cleanedSlug = slug.replace(/[^\w-]/g, '');
            const newBook = book.create({
                title,
                description,
                category,
                price,
                poster: posterFileName,
                file:  bookFileFileName,
                slug:cleanedSlug
            });

            return res.status(200).send({ message: 'Book added successfully' });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};





exports.CheckBookByTitle=async (req,res)=>{


    try{
        const  title  =req.params.title
        const isTitleAlreadyExists = await book.findOne({ title:title });

        if (!isTitleAlreadyExists) {

            return res.status(404).json({ message: 'Book Title Does not  exists' });
        }

        return res.status(200).json({message:"Book title already exists" })


    }catch (e){

        return res.status(500).json({message:"Internal server error" })

    }
}



exports.getBookByCategory = async (req, res) => {
    try {

        const userId =  req.user.id
        const getuser = await User.findById(userId).populate('books');
        const category = req.params.category;
        const books = await book.find({ category: category });

        if (books.length > 0) {

            let booksDTO = await Promise.all(books.map(async (book) => {
                const bookId = book._id;

                const existingCart = await cart.findOne({  userId:userId, books: bookId }) ? true : false;
                const CheckbookInLibrary = getuser.books.find(b => b._id.toString() === bookId.toString()) ? true : false;

                return {
                    id: bookId,
                    title: book.title,
                    category: book.category,
                    price: book.price,
                    poster: book.poster,
                    slug: book.slug,
                    isPurchase: CheckbookInLibrary,
                    Incart: existingCart
                };
            }));




            return res.status(200).json({  booksDTO });
        }

        return res.status(404).json({ message: "No books found with that category" });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};

exports.getBookById= async (req, res) => {


    try{

            let id = req.params.id
        if (!id) {
            return res.status(400).json({ error: 'Invalid book ID' });
        }

        const getbook = await book.findById( {   id } )

        if(getbook){
            const bookDto = {
                title :getbook.title,
                description:getbook.description,
                price:getbook.price,
                poster:getbook.poster,
                id:getbook.id,
                category:getbook.category


            }
            return res.status(200).json({ bookDto });



        }


        return res.status(200).json({ message:"no books found with that Id" });




    }catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal Server Error'});





    }


}




exports.getBookByslug= async (req, res) => {


    try{
        const Slug=req.params.slug


        const getbook = await book.findOne( {slug: Slug } )

        if(getbook){



            const userId =  req.user.id
            const getuser = await User.findById(userId).populate('books');

            const existingCart = await cart.findOne({userId: userId, books: getbook._id }) ? true : false;
            const CheckbookInLibrary = getuser.books.find(b => b._id.toString() === getbook._id.toString()) ? true : false;


            const bookDto = {
                title :getbook.title,
                description:getbook.description,
                price:getbook.price,
                poster:getbook.poster,
                id:getbook.id,
                category:getbook.category,
                isPurchase: CheckbookInLibrary,
                Incart: existingCart,



            }
            return res.status(200).json({ bookDto });



        }


        return res.status(200).json({ message:"no books found with that slug" });




    }catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal Server Error'});





    }


}



exports.SearchByTitle= async (req,res)=> {

    try {

        const {keyword, maxprice, order} = req.query
        const userId =  req.user.id
        const getuser = await User.findById(userId).populate('books');
        const regex = new RegExp(keyword, 'i'); // 'i' for case-insensitive
        const filteredBooks = await book.find(
            {title: {$regex: regex},

                price: { $lte:  (maxprice)}
            });

        if(!filteredBooks){

            return res.status(404).json({ message:"no books found " });

        }



        const orderedBooks = order === 'desc'
            ? filteredBooks.sort((a, b) => a.title.localeCompare(b.title))
            : filteredBooks.sort((a, b) => b.title.localeCompare(a.title));


        let booksDTO = await Promise.all(orderedBooks.map(async (book) => {
            const bookId = book._id;

            const existingCart = await cart.findOne({ userId, books: bookId }) ? true : false;
            const CheckbookInLibrary = getuser.books.find(b => b._id.toString() === bookId.toString()) ? true : false;

            return {
                id: bookId,
                title: book.title,
                category: book.category,
                price: book.price,
                poster: book.poster,
                slug: book.slug,
                isPurchase: CheckbookInLibrary,
                Incart: existingCart
            };
        }));

        return res.status(200).json({booksDTO});


    } catch (error) {

        return res.status(500).send({message: 'Internal Server Error' + error});


    }


}

exports.FilterBooks=async (req,res)=>{



    try{
        const {category, maxprice, order}=req.query


        const userId =  req.user.id
        const getuser = await User.findById(userId).populate('books');



            const filteredBooks = await book.find({ price: { $lte:  (maxprice) },category: category  });


            if(!filteredBooks){

                return res.status(404).json({ message:"no books found " });

            }




            const orderedBooks = order === 'desc'
                ? filteredBooks.sort((a, b) => a.title.localeCompare(b.title))
                : filteredBooks.sort((a, b) => b.title.localeCompare(a.title));


        let booksDTO = await Promise.all(orderedBooks.map(async (book) => {
            const bookId = book._id;

            const existingCart = await cart.findOne({ userId:userId, books: bookId }) ? true : false;
            const CheckbookInLibrary = getuser.books.find(b => b._id.toString() === bookId.toString()) ? true : false;

            return {
                id: bookId,
                title: book.title,
                category: book.category,
                price: book.price,
                poster: book.poster,
                slug: book.slug,
                isPurchase: CheckbookInLibrary,
                Incart: existingCart
            };
        }));


            return res.status(200).json({ booksDTO});


        }catch (error){

        return res.status(500).send({ message: 'Internal Server Error' +error});

    }




}

exports.GetBookInfoForUpdate=async(req,res)=>{

            const BookId=req.params.id

    try{


      const getBook = await book.findOne( {_id: BookId } )
      if(!getBook) return  res.status(401).send({message: 'Book not found'});



        const bookDto = {
            title: getBook.title,
            description: getBook.description,
            price: getBook.price,

            id: getBook.id,

            category: getBook.category


        }


    return res.status(200).send(bookDto);

}catch (error){

    return res.status(500).send({message: 'Internal Server Error' + error});
}




}




exports.UpdateBook = async (req, res) => {
    try {
        const id = req.params.id;


        const getbook = await book.findOne({ _id: id });

        const AllBooks=await book.find();
        const { title, description, category, price } = req.body;



        if (!getbook) return res.status(404).send({ message: 'Book not found' });

        const isTitleAlreadyExists = (  AllBooks ?? []).some(item =>  item.title === title && item._id.toString()!==id.toString());

        if (isTitleAlreadyExists) {
            return res.status(400).json({ message: 'Book Title Already exists' });
        }


        if(!req.body)   return res.status(404).send({ message: 'bad request'  });
        if (getbook.title !== title) {

            const slug = title.replace(/\s+/g, '-').toLowerCase();
            const cleanedSlug = slug.replace(/[^\w-]/g, '');
            getbook.title = title;
            getbook.slug = cleanedSlug;
        }

        getbook.description = description || getbook.description;
        getbook.category = category || getbook.category;
        getbook.price = price || getbook.price;


        await getbook.save();

        res.status(200).send({ message: 'Book updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error: ${error.message}` });
    }
}








exports.DeleteBookById = async (req,res)=> {


    const  id = req.params.id;


    let getbook=await book.findById( id);

    if(!getbook){

        return res.status(400).send({ message: 'Book  with given id does not exists '});

    }


    const filename = getbook.file;
    const fileePath = `../uploads/files/${filename}`;
    const postername=getbook.poster
    const posterpath= `../uploads/posters/${postername}`;


    try{


        DeleteFile(fileePath)
        DeleteFile(posterpath)
        await book.deleteOne({ _id:  id});
        return res.status(200).json({ message: 'Book deleted successfully' });

    }catch(error){

        return res.status(500).send({ message: 'Internal Server Error' +error});


    }






}




const DeleteFile=(filePath)=>{



    const absoluteFilePath = path.resolve(__dirname, filePath);




        fs.unlink(absoluteFilePath, (err) => {
            if (err) {
                console.error(`Error deleting  file: ${err.message}`);
                return false
            } else {
                return true

            }
        });
        return false
    }













exports.getAllBook= async (req,res)=> {







    try{
        const allBooks = await book.find({});

        if(!allBooks) {

            return res.status(404).json({ message: 'Not fount at least 1 Book' });

        }
            const booksDTO = allBooks.map(book => ({
                 id: book._id,
                title: book.title,
                category: book.category,
                price: book.price,
                poster: book.poster,
                slug: book.slug
            }));
            return res.status(200).json({booksDTO});





    }catch(error){

        return res.status(500).send({ message: 'Internal Server Error' +error});


    }






}




exports.NewBooks=async (req,res)=>{


    const userId =  req.user.id
    const getuser = await User.findById(userId).populate('books');

    try{
        const newBooks = await book.find()
            .sort({ _id: -1 })
            .limit(5)

        if(!newBooks) {

            return res.status(404).json({ message: 'Not fount at least 1 Book' });

        }



        let booksDTO = await Promise.all( newBooks.map(async (book) => {
            const bookId = book._id;

            const existingCart = await cart.findOne({ userId, books: bookId }) ? true : false;
            const CheckbookInLibrary = getuser.books.find(b => b._id.toString() === bookId.toString()) ? true : false;

            return {
                id: bookId,
                title: book.title,
                category: book.category,
                price: book.price,
                poster: book.poster,
                slug: book.slug,
                isPurchase: CheckbookInLibrary,
                Incart: existingCart
            };
        }));









        return res.status(200).json({booksDTO});





    }catch(error){

        return res.status(500).send({ message: 'Internal Server Error' +error});


    }






}






exports.GetUserBooks = async (req, res) => {
    try {
         const userId =  req.user.id
         const getuser = await User.findById(userId).populate('books');


        if (!getuser) {
            return res.status(404).json({ message: 'User not found' });
        }

        if(!getuser.books){ return res.status(404).json({ message: 'Books not found' });}

         const userBooks = getuser.books.map(book => ({
            id: book._id,
            title: book.title,
            poster: book.poster,

        }));

        return res.status(200).json({ userBooks });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};



exports.getBookFile = async (req, res) => {
    try {
        const bookId = req.params.id;


        const userId =  req.user.id
        const getuser = await User.findById(userId).populate('books');

        const IsOwner = ( getuser.books ?? []).some(book => book._id.toString() === bookId);

        if (!IsOwner){

            return res.status(404).json({ message: 'You are not allowed to read this book ' });
        }


        const getbook = await book.findById(bookId);


        if (!getbook) {
            return res.status(404).json({ message: 'Book not found' });
        }


        if (!getbook.file) {
            return res.status(400).json({ message: 'Invalid or missing PDF file for the book' });
        }


        const filePath=getbook.file




        return res.status(200).json({ filePath });


    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};

