import styles from './Header.module.css'
import {useContext, useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import {useNavigate} from "react-router";
import {useCart} from "../../Context/cartContext";
import ApiService from "../../Services/ApiService";

import { useLocation } from 'react-router-dom';



const Header = ()=>{
    const {   setCartVisible,cartItems, setCartItemTotal ,  userballance,setuserballance, ResetAll} = useCart();
    const navigate=useNavigate()
    const { pathname } = useLocation();
    const  [state,setState]=useState({isAdmin:false, balance:userballance, cartquantity:0,})
    const signout=()=>{



        ResetAll()
        localStorage.setItem("token", '')
        navigate("/signin")

    }

    useEffect(()=>{
        try{
            const token= localStorage.getItem("token")

            if(token){
                try {
                    const fetch=async ()=>{

                    const { success, data, errorMessage } = await ApiService.HeaderInfo()

                    if (success) {
                        setCartItemTotal(data.cartQauntity)
                       setState((prev)=>({...prev,
                        balance: data.balance,
                           isAdmin: data.isAdmin,
                           cartquantity:data.cartQauntity
                       }))
                        setuserballance(data.balance)
                    } else {
                        console.error(`Error fetching all books: ${errorMessage}`);
                    }
                    }
                   fetch()
                } catch (error) {
                    console.error(error);
                }

            }else{

                navigate("/signin")


            }

        }catch (e){


        }



    },[])
    return <div>

        <nav className={styles.navbar}>
            <div className={styles.container}>



                <button onClick={() => navigate("/")}
                        className={styles.logo}


                >
                    Ebooks

                </button>



                <div className={styles.navelements}>

                    <ul>

                        <li>



                            <button onClick={() => navigate("/books")}


                 className={`${styles.navbtns} ${pathname === '/books' ? styles.active : ''}`}

                            >
                                Books

                            </button>

                        </li>
                        <li>

                            <button onClick={() => navigate("/mybooks")}

                                    className={`${styles.navbtns} ${pathname === '/mybooks' ? styles.active : ''}`}


                            >
                                Library

                            </button>


                        </li>
                        <li>

                            <div className={styles.ballancediv}>

<span className="material-symbols-outlined">
payments
</span>
                                <div className={styles.ballancetext}>{userballance.toFixed(2)}$</div>
                            </div>
                        </li>
                        <li>
                            <button className={styles.cartBtn}

                                    onClick={() => {
                                        setCartVisible(true)
                                    }}
                            >
                               <span className="material-symbols-outlined">
                                shopping_cart
                                </span> Cart({cartItems})


                            </button>


                        </li>


                        {state.isAdmin &&
                            <li className={styles.authdul}>
                                <button className={styles.signoutbtn} onClick={() => {
                                    navigate("/admin")
                                }}>

                                    <div>Admin</div>

                                    <span className="material-symbols-outlined">
shield_person
</span>
                                </button>
                            </li>
                        }


                        <li className={styles.authdul}>
                            <button className={styles.signoutbtn} onClick={() => {
                                signout()
                            }}>

                                <div>Sign out</div>
                                <span className="material-symbols-outlined">
                                logout
                                </span>

                            </button>
                        </li>
                    </ul>


                </div>


            </div>

        </nav>

    </div>
}

export default Header;