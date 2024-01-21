

import React, { createContext, useContext, useState } from 'react';
import CartModal from "../Components/CartModal/CartModal";
import bookItem from "../Components/BookItem/BookItem";
import Header from "../Components/Header/Header";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(0);
    const [cartVisible, setCartVisible] = useState(false);
    const [PurchasedItems,SetPurchasedItems]=useState([])
    const [CartItemsArray,SetCartItemsArray]=useState([])
    const [userballance,setuserballance]=useState(0)



    const ResetAll=()=>{
        setCartItems(0)
        setuserballance(0)
        setCartItemTotal(0)
        SetCartItemsArray([])
        SetPurchasedItems([])

    }

    const AddToCart = (bookId) => {
        if (!IfinCart(bookId)) {
            SetCartItemsArray((prev) => ([...prev, bookId]
            ));
        }
    };
    const IfinCart=(bookId)=>{
        return CartItemsArray.includes(bookId);
    }
    const RemoveFromCart=(bookId)=>{
        if( IfinCart(bookId)){
            SetCartItemsArray((prevCartItems) => prevCartItems.filter((id) => id !== bookId));
       }

    }
    const addToPurchased=(bookId)=>{
        if (!IfPurchased(bookId)) SetPurchasedItems((prev) => [...prev, bookId]);
    }
    const IfPurchased=(bookId)=>{

        return PurchasedItems.includes(bookId);
    }
    const incrementCartItems = ( ) => {
        setCartItems(cartItems +1);
    };

    const setCartItemTotal=(amount)=>{
        setCartItems(amount);
    }
    const decrementCartItems=()=>{
        setCartItems(cartItems-1)
    }
    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartVisible,
                setCartVisible,
                incrementCartItems,
                setCartItemTotal,
                decrementCartItems,
                IfPurchased,
                addToPurchased,
                PurchasedItems,
                RemoveFromCart,
                IfinCart,
                AddToCart,
                CartItemsArray,
                SetCartItemsArray,
                userballance,setuserballance,
                ResetAll

            }}
        >

            <div>

                    {/*<Header></Header>*/}

                <div>
                    {children}
                </div>

            </div>



            {cartVisible && <CartModal></CartModal>}
        </CartContext.Provider>
    );
};

const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('must be used within a CartProvider');
    }
    return context;
};

export { CartProvider, useCart };
