import Header from "../../Header/Header";
import style from './MyBooks.module.css'
import MybookItem from "../../MybookItem/MybookItem";
import {useEffect, useState} from "react";
import ApiService from "../../../Services/ApiService";
//import cartContext from "../../../Context/cartContext";
import CartModal from "../../CartModal/CartModal";

const MyBooks =()=>{


    const [bookState, setBookState] = useState({
        books: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userBooks = await ApiService.GetUserBooks();

                setBookState((prev) => ({
                    ...prev,
                    books: userBooks,
                }));
            } catch (error) {

                console.error('Error fetching user books:', error.message);
            }
        };

        fetchData();
    }, []);


    return <div>


        <div className={style.content}>


            <div className={style.TitleDiv}>
                <span  className={`material-symbols-outlined ${style.bookicon}`}>
book_2
</span>
                <div className={style.mybooktitle}>My books</div>

            </div>
                <div className={style.mybookslist}>

                    { bookState.books &&
                        bookState.books.map(book=>

                            <MybookItem   title={book.title}
                                        id={book.id}
                                poster={book.poster}
                                        key={book.id}
 ></MybookItem>

                        )


                    }



                    {

                        !bookState.books.length &&

                         <div className={style.booknotfound}>You dont have any book </div>
                    }


                </div>




        </div>


    </div>

}

export default MyBooks