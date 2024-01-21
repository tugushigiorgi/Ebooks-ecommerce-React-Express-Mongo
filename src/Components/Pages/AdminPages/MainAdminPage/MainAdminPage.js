import React, { useEffect, useState } from "react";
import AdminHeader from "../../../AdminHeader/AdminHeader";
import BookItem from "../../../BookItem/BookItem";
import AdminDeleteModal from "../../../AdminDeleteModal/AdminDeleteModal";
import ApiService from "../../../../Services/ApiService";
import style from "./MainAdminPage.module.css";

const MainAdminPage = () => {
    const [state, setState] = useState({
        loading: true,
        bookData: [],
        deleteModal: false,
        itemToDelete: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setState((prev) => ({ ...prev, loading: true }));
                const { success, data, errorMessage } = await ApiService.GetAllBooks();

                if (success) {
                    setState((prev) => ({
                        ...prev,
                        bookData: data.length === 0 ? [] : data,
                    }));
                } else {
                    console.error(`Error fetching all books: ${errorMessage}`);
                }

                setState((prev) => ({ ...prev, loading: false }));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const deleteModalHandler = (itemId) => {
        setState((prev) => ({ ...prev, deleteModal: true, itemToDelete: itemId }));
    };


    const deleteBook = async () => {
        const response = await ApiService.DeleteBookById(state.itemToDelete);

        if (response.success) {
            setState((prev) => ({
                ...prev,
                bookData: prev.bookData.filter((book) => book.id !== state.itemToDelete),
                deleteModal: false,
                itemToDelete: 0,
            }));
        } else {
            console.error(`Error deleting book: ${response.errorMessage}`);
        }
    };
    return (
        <div>
            <AdminHeader />
            <div className={style.content}>
                {state.deleteModal && (
                    <AdminDeleteModal
                        YesHandler={deleteBook}
                        CancelBtnHanlder={() => setState((prev) => ({ ...prev, deleteModal: false }))}
                    />
                )}
                <div className={style.Bookslistwrapper}>
                    <div className={style.bookslist}>
                        {state.bookData && state.bookData.map((b) => (
                            <BookItem
                                key={b.id}
                                isAdmin={true}
                                price={b.price}
                                Poster={`${ApiService.apiBase}/${b.poster}`}
                                id={b.id}
                                DeleteHandler={deleteModalHandler}
                                link={b.slug}
                            />
                        ))}


                    </div>

                    { !state.bookData.length &&
                    <div className={style.nobookfounddiv}>

                        <div>No book has been uploaded on the server</div>



                    </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default MainAdminPage;
