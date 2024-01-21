import React, {useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import ApiService from "../../Services/ApiService";
import CartItem from "../Cartitem/CartItem";
import style from './CartModal.module.css';
import cartItem from "../Cartitem/CartItem";
import {useCart} from "../../Context/cartContext";
import {useNavigate} from "react-router";
import {Button} from "@react-pdf-viewer/core";


const CartModal = ( ) => {
    const [cartState, setCartState] = useState({
        inputData: { code: "" },
        codeError: false,
        discount: 0,
        isDiscount: false,
        currentPrice: 0,
        userBalance: 0,
        successPurchase: false,
        cartData: [],


        oldprice:0,
        isBallanceEnough:false,

    });
    const navigate=useNavigate()

    const GotoMybooksPage=()=>{
        setCartVisible(false)
        navigate("/mybooks")
    }
    const {setCartVisible,setCartItemTotal,decrementCartItems ,RemoveFromCart,addToPurchased,
        userballance,
        setuserballance
    }


        = useCart();



    useEffect(() => {

        let totalPrices = cartState.cartData.reduce((sum, item) => sum + Number(item.price), 0);

        setCartState((prev) => ({
            ...prev,
            oldprice: totalPrices,
            currentPrice: cartState.isDiscount ? totalPrices - (totalPrices * cartState.discount / 100) : totalPrices
        }));

    }, [cartState.cartData]);


    useEffect(() => {
        setCartState((prev) => ({
            ...prev,

            isBallanceEnough: cartState.userBalance >= cartState.currentPrice
        }));
    }, [cartState.currentPrice]);




    useEffect(() => {
        try {

            const fetch =async()=> {
                const userCart = await ApiService.GetUserCart();
                if (userCart) {
                    setCartState((prev) => ({
                        ...prev,
                        cartData: userCart.cartData,
                        userBalance: userCart.userBalance

                    }));
                } else {

                    setCartState((prev) => ({
                        ...prev,
                        cartData: [],
                        userBalance: 0,
                    }));
                }

            }
            fetch()
        } catch (error) {
            console.log(error);
        }
    }, []);




    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCartState((prev) => ({
            ...prev,
            inputData: {
                ...prev.inputData,
                [name]: value
            }
        }));
    };

    const checkoutHandler = async () => {
        try {

            if (cartState.isBallanceEnough) {
                const checkoutResult = await ApiService.Checkout(cartState.inputData.code, cartState.currentPrice);

                if (checkoutResult.success) {
                    cartState.cartData.forEach((item) => {
                        addToPurchased(item.id);
                        RemoveFromCart(item.id);
                    });
                    setCartState((prev) => ({ ...prev, successPurchase: true, cartData: [] }));
                    setCartItemTotal(0);
                    setuserballance(userballance-cartState.currentPrice)

                } else {
                    setCartState((prev) => ({ ...prev, isBallanceEnough: false }));

                }
            } else {
                setCartState((prev) => ({ ...prev, isBallanceEnough: false }));
            }




        } catch (error) {
            console.log(error);
        }
    };


    const deleteAllBookHandler = async () => {
        try {
            const deleteResult = await ApiService.DeleteCart();

            if (deleteResult.success) {
                cartState.cartData.forEach((item) => {
                    RemoveFromCart(item.id);
                });
                setCartState((prev) => ({
                    ...prev,
                    cartData: [],
                    currentPrice: 0,
                    discountPrice: 0,
                }));
                setCartItemTotal(0);
            } else {
                console.log(`Error deleting cart: ${deleteResult.errorMessage}`);
            }
        } catch (error) {
            console.error(error);
        }
    };



    const deleteBookHandler = async (id) => {
        try {
            const deleteResult = await ApiService.DeleteCartItem(id);

            if (deleteResult.success) {
                setCartState((prev) => ({
                    ...prev,
                    cartData: prev.cartData.filter((book) => book.id !== id),
                }));
                decrementCartItems();
                RemoveFromCart(id);
            } else {
                console.log(`Error Deleting card: ${deleteResult.errorMessage}`);
            }
        } catch (error) {
            console.error(error);
        }
    };


    const couponCheckHandler = async () => {


        if(!cartState.inputData.code) return
        setCartState((prev) => ({ ...prev, codeError: false, isDiscount: false, discountPrice: 0 }));

            try {
                const couponResult = await ApiService.CheckCouponCode(cartState.inputData.code, cartState.currentPrice);

                if (couponResult.success) {
                    setCartState((prev) => ({
                        ...prev,
                        isDiscount: true,
                        discount: couponResult.discount,
                        currentPrice: couponResult.currentPrice,
                        oldPrice: couponResult.oldPrice,
                        CouponCode: couponResult.code,
                    }));
                } else {
                    setCartState((prev) => ({ ...prev, codeError: true }));
                    console.log(couponResult.errorMessage);
                }
            } catch (error) {
                console.error(error);
            }

    };

    return (
        <div>
            <div id="myModal" className={style.modal}>
                <div className={style.modalcontent}>
                    <div className={style.closebtndiv}>
                        <button className={style.closebtn}
                            onClick={()=>{setCartVisible(false) }}

                        >
                            <span className="material-symbols-outlined">cancel</span>
                        </button>
                    </div>
                    {cartState.cartData.length > 0 && (
                        <div className={style.Heading}>
                            <div className={style.headerti}>
                                <span className={`material-symbols-outlined ${style.cartlogoicon}`}>shopping_cart</span>
                                <div className={style.carttitle}>Cart ({cartState.cartData.length})</div>
                            </div>
                            <div className={style.subfooterdiv}>
                                <div className={style.ballancediv}>
                                    <span className="material-symbols-outlined">payments</span>
                                    <div className={style.accountballancevaluetitle}>
                                        Your balance: {cartState.userBalance}$
                                    </div>
                                </div>
                                <button className={style.clearallbtn} onClick={deleteAllBookHandler}>
                                    Clear all
                                </button>
                            </div>
                            <div className={style.coupondiv}>
                                <div className={style.pricesecinon}>
                                    <div>
                                        <input
                                            placeholder="Coupon Code"
                                            disabled={cartState.isDiscount}
                                            onChange={handleInputChange}
                                            name="code"
                                            className={style.couponinput}
                                        />
                                        <button

                                            className={ cartState.isDiscount ? style.disabledCouponbtn  :style.couponcheckbtn


                                        }


                                                onClick={couponCheckHandler}


                                        >
                                            Check
                                        </button>
                                    </div>
                                    <div className={style.Totalpricetitle}>
                                        Total :
                                        {cartState.isDiscount &&

                                                <div className={style.currentprice}>{cartState.oldprice.toFixed(2)}$</div>}
                                                <div className={style.newpricet}>
                                                    {cartState.currentPrice.toFixed(2)
                                                        }$
                                                </div>


                                    </div>
                                </div>
                                {cartState.codeError && (
                                    <div className={style.couponmessage}>Discount Code is incorrect!</div>
                                )}
                                {cartState.isDiscount && (
                                    <div className={style.discountpricemessage}>
                                        You got {cartState.discount}% discount!
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <div className={style.content}>
                        <div className={style.cartlist}>
                            <div className={style.cartlistitems}>
                                {cartState.cartData &&
                                    cartState.cartData.map((book) => (
                                        <CartItem
                                            DeleteHandler={deleteBookHandler}
                                            key={book.id}
                                            poster={book.poster}
                                            id={book.id}
                                            price={book.price}
                                            title={book.title}
                                        ></CartItem>
                                    ))}
                            </div>
                            <div className={style.usermessageContainer}>
                                {!cartState.cartData.length && !cartState.successPurchase && (
                                    <div className={style.listisemptydiv}>
<span className={`material-symbols-outlined ${style.emptybasketicon}`}>
production_quantity_limits
</span>
                                        <div>Cart is empty </div>
                                    </div>
                                )}
                                {cartState.successPurchase && (
                                    <div className={style.SuccessMessagediv}>
<span className={`material-symbols-outlined ${style.successchecmkaricon}`}>
done
</span>
                                        <div>You successfully bought Ebook(s)</div>
                                        <div>
                                            Go to <button  className={style.hrefbtn} onClick={()=>{GotoMybooksPage()}}>My books</button> to read it{" "}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={style.footerdiv}>

                            { !cartState.isBallanceEnough &&    <div className={style.errorrtitle}



                            >You don't have enough money! </div>}


                            {cartState.cartData.length > 0 &&    (
                                <button

                                    className={ cartState.isBallanceEnough ?    style.checkoutbtn :  style.cartDisabledBtn} onClick={checkoutHandler}>



                                    Checkout
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartModal;
