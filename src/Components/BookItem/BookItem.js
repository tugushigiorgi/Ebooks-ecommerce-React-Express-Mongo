import styles from './Bookitem.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useCart } from '../../Context/cartContext';
import ApiService from '../../Services/ApiService';
import { useEffect, useState } from 'react';

const BookItem = ({ id, Poster, link, price, isAdmin, DeleteHandler, isPurchase, Incart }) => {
    const navigate = useNavigate();


    const { incrementCartItems,
 PurchasedItems,IfPurchased,
        IfinCart,
        AddToCart,
        CartItemsArray,
        addToPurchased
    } = useCart();

    const [state, setState] = useState({
        isInCart: false,
        isPurchased: false,
    });

    useEffect(()=>{

        if(Incart){
            AddToCart(id)
            setState((prev) => ({
                ...prev,
                isInCart: true
                ,
            }));
        }
        if( isPurchase){

            addToPurchased(id)
            setState((prev) => ({
                ...prev,
                isPurchased: true
                ,
            }));
        }
        },[])





    useEffect(() => {
        setState((prev) => ({
            ...prev,
            isInCart: IfinCart(id),
        }));
    }, [CartItemsArray, id]);

    useEffect(()=>{
        setState(prevState => ({ ...prevState, isPurchased: IfPurchased(id) }));
        },[  PurchasedItems, id])


    const AddToCartHandler = async () => {
        try {
            const success = await ApiService.AddToCart(id);

            if (success) {
                setState(prevState => ({ ...prevState, isInCart: true }));
                incrementCartItems();
                AddToCart(id)
            } else {
                console.log("Something went wrong");
            }
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div>
            <div className={styles.Mainwrapper}>
                <div className={styles.Container}>
                    {isAdmin && (
                        <div className={styles.Adminheader}>
                            <button className={styles.editbtn} onClick={() => navigate(`/admin/update/${id}`)}>
                                Edit
                            </button>
                            <button className={styles.deletebtn} onClick={() => DeleteHandler(id)}>
                                Delete
                            </button>
                        </div>
                    )}

                    <img src={Poster} alt="Poster not found" onClick={() => navigate(`/book/${link}`)} />

                    {!isAdmin && (
                        <div>
                            {!state.isInCart && !state.isPurchased && (
                                <button className={styles.Cartbtn} onClick={AddToCartHandler}>
                                    <div>{price}₾</div>
                                    <div>
                                        <span className="material-symbols-outlined cartim">shopping_cart</span>
                                    </div>
                                </button>
                            )}

                            {state.isInCart && !state.isPurchased  && <div className={styles.addedtocart}>Added in cart</div>}
                            {state.isPurchased && !state.isInCart &&  <div className={styles.purchased}>Purchased</div>}
                        </div>
                    )}

                    {isAdmin && (
                        <button className={styles.adminpriceview}>
                            <div>{price}₾</div>
                        </button>
                    )}


                </div>
            </div>
        </div>
    );
};

export default BookItem;
