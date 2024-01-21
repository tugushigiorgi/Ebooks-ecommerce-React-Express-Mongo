import style from './Detailed.module.css'
import Header from "../../Header/Header";
import BookItem from "../../BookItem/BookItem";
import axios from "axios";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import ApiService from "../../../Services/ApiService";
import apiService from "../../../Services/ApiService";
import { withRouter } from 'react-router-dom';
import {useCart} from "../../../Context/cartContext";
const  DetailedPage =  ()=>{
    const [Data,setData]=useState({
        id:'',
        title:'',
        price:'',
        poster:'',
        description:'',
        category:'',
        InCart :false ,
        isPurchase:false,

    })
    const {

        AddToCart ,
        PurchasedItems,
        CartItemsArray,
        IfPurchased,
        addToPurchased,
        IfinCart,
        incrementCartItems

    } = useCart();

    const { slug } = useParams();
    useEffect(  ()=> {

            const fetchData = async () => {
                try {
                    const bookData= await ApiService.GetBookbySlug(slug);
                    setData({
                        title: bookData.title,
                        price: bookData.price,
                        id: bookData.id,
                        description: bookData.description,
                        category: bookData.category,
                        poster: ApiService.apiBase + '/' + bookData.poster,
                        InCart: bookData.Incart,
                        isPurchase: bookData.isPurchase,
                    });
                    if(bookData.Incart){

                        AddToCart( bookData.id)

                    }
                    if(bookData.isPurchase){
                        addToPurchased( bookData.id)

                    }
                } catch (err) {
                    console.log(err)
                }
            }
            fetchData()
        }
        ,[])


    useEffect(() => {
        setData((prev) => ({
            ...prev,
            InCart: IfinCart(Data.id),
        }));
    }, [CartItemsArray,Data.id]);

    useEffect(() => {
        setData((prevState) => ({
            ...prevState,
            isPurchase: IfPurchased(Data.id),
        }));
    }, [PurchasedItems,Data.id]);



    const AddToCartHandler = async () => {
        try {
            const success = await ApiService.AddToCart(Data.id);

            if (success) {
                setData((prevState) => ({ ...prevState, InCart: true }));
                incrementCartItems();
                AddToCart(Data.id);
            } else {
                console.log("Something went wrong");
            }
        } catch (error) {
            console.log(error);
        }
    };



    return <div>


        <div className={style.content}>
            {Data &&
                <div className={style.bookdiv}>

                    <div className={style.bookposter}>

                        <img  src={Data.poster} alt="Poster not found "/>

                    </div>
                    <div className={style.bookinfodiv}>
                        <div className={style.booktitlediv}>
                            {Data.title}

                        </div>

                        <div className={style.categorydiv}>  {Data.category}</div>

                        <div className={style.ratingDiv}>

                            <span className="material-symbols-outlined">
star
</span>                      <span className="material-symbols-outlined">
star
</span>                      <span className="material-symbols-outlined">
star
</span>                      <span className="material-symbols-outlined">
star
</span>                      <span className="material-symbols-outlined">
star
</span>


                        </div>


                        {
                            !Data.InCart &&  !Data.isPurchase &&

                            <button className={style.addcartbtn}  onClick={()=>AddToCartHandler()}>
                                add to cart {Data.price}$

                            </button>


                        }
                        {
                              Data.InCart &&  !Data.isPurchase &&

                            <div className={style.addincart}


                            >Added in Cart </div>


                        }
                        {
                               Data.isPurchase &&

                            <div
                                className={style.addincart}

                            >Purchased</div>


                        }









                        <div className={style.DescriptionDiv}>
                        <div className={style.DescriptionDivTitle}>Description</div>
                            <div className={style.descriptionText}>
                                {Data.description}
                            </div>



                        </div>





                    </div>





                </div>




            }

            {!Data && <div className={style.booknotfound}>Book not found</div>}

            {/*<div  className={style.recomentadionsdiv}>*/}

            {/*    <div  className={style.recomendationstitle}>Recomended</div>*/}
            {/*    <div className={style.recomendationscontainer}>*/}

            {/*    </div>*/}

            {/*</div>*/}



        </div>

    </div>


}

export  default DetailedPage;