
import style from './MainPage.module.css'
import Header from "../../Header/Header";
import BookItem from "../../BookItem/BookItem";
import CartModal from "../../CartModal/CartModal";
import React, {useEffect, useState} from "react";
import {CartProvider, useCart} from "../../../Context/cartContext";
import ApiService from "../../../Services/ApiService";
import apiService from "../../../Services/ApiService";

const MainPage= ()=>{
    const [Data,setData]=useState({

        BookData:[],
        Loading:true,
        CouponCode:"N/A",
        Discount:"N/A"
    })


    useEffect(() => {
        const fetchData = async () => {
            try {
                // book data
                const bookData = await ApiService.NewBooksFeed();

                //  coupon data
                const couponData = await ApiService.RandomCouponForBanner();


                setData((prev) => ({
                    ...prev,
                    Loading: false,
                    BookData: bookData,
                    CouponCode: couponData.CouponCode,
                    Discount: couponData.Discount,
                }));


            } catch (error) {

                setData((prev) => ({ ...prev, Loading: false }));
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    return <div>


        <div className={style.content}>


            <div className={style.Bannerdiv}>

                <img src="/img.png" className={style.BannerImg}/>
                <div className={style.BannerCouponCodeDiv}>{Data.CouponCode}</div>
                <div className={style.BannerCouponDiscountDiv}>{Data.Discount}</div>

            </div>


            <div className={style.NewEbooks}>
                <div>
                    <div className={style.NewEbooksTitle}>New Ebooks</div>

                    <div className={style.NewEbookContainer}>


                        {Data.BookData && Data.BookData.map((b) => (
                            <BookItem
                                isPurchase={b.isPurchase}
                                Incart={b.Incart}
                                key={b.id}
                                id={b.id}
                                isAdmin={false}
                                price={b.price}
                                Poster={apiService.apiBase + '/' + b.poster}
                                link={b.slug}
                            />
                        ))}

            <div>
                        {!Data.BookData.length && <div className={style.booksnotfound}>

                            <div>Books not found</div>
                            <span className="material-symbols-outlined">
database
</span>
                            </div>}
            </div>
                    </div>

                </div>

            </div>



        </div>


    </div>


}


export default MainPage;