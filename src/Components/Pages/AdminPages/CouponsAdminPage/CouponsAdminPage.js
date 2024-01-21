import React, { useEffect, useState } from "react";
import style from './CouponsAdminPage.module.css';
import AdminHeader from "../../../AdminHeader/AdminHeader";
import CouponItem from "../../../CouponItem/CouponItem";
import ApiService from "../../../../Services/ApiService";

const CouponsAdminPage = () => {
    const [Coupons, SetCoupons] = useState([]);
    const [CouponData, setCouponData] = useState({ code: '', discount: '' });
    const [userInputErrorsData, setUserInputErrorsData] = useState([]);


    const DeleteCoupon = async (id) => {
        try {
            const response = await ApiService.DeleteCouponById(id);

            if (response.success) {
                SetCoupons((prev) => prev.filter((coupon) => coupon.id !== id));
            } else {
                console.error(`Error deleting coupon: ${response.errorMessage}`);
            }
        } catch (error) {
            console.error(error);
        }
    };







    let CheckIfExists=(Couponcodetxt)=>{

       return Coupons.some((c) => c.code === Couponcodetxt);
    }


    const AddCouponHandler = async () => {
        setUserInputErrorsData([]);


        const errors = [];
        const { code, discount } = CouponData;
        if (!code.trim()) {
            errors.push('Code is required.');
        } else if (code.trim().length!==6) {
            errors.push('Code should be Exactly 6 characters long.');
        }else if (CheckIfExists(code.trim())){
            errors.push('Code Already exists.');

        }

        if (!discount) {
            errors.push('Discount is required.');
        }else if (discount.length>4){
            errors.push('Discount is invalid ,Number is too big');

        }

        if (errors.length === 0) {


            try {
                const response = await ApiService.AddNewCoupon(CouponData.code, CouponData.discount);

                if (response.success ) {
                    SetCoupons((prev) => [...prev, { id: response.data.couponId, ...CouponData }]);
                    setCouponData({ code: '', discount: '' });


                } else {
                    console.error(`Error adding new coupon: ${response.errorMessage}`);
                }
            } catch (error) {
                console.error('Error:', error.message);
            }


        } else {
            setUserInputErrorsData(errors);
        }

    };

    const handleGetCouponData = (e) => {
        const { value, name } = e.target;
        setCouponData((prevCouponData) => ({ ...prevCouponData, [name]: value }));
    };






    useEffect(() => {
        const fetchData = async () => {
            try {
                const { success, data, errorMessage } = await ApiService.GetAllCoupons();
                if (success) {
                    SetCoupons(data);
                } else {
                    console.error(`Error fetching all coupons: ${errorMessage}`);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);





    return (
        <div>
            <AdminHeader />
            <div className={style.content}>
                <div className={style.wrapper}>
                    <div className={style.container}>
                        <div className={style.couponlist}>
                            <div className={style.headerl}>
                                <div>Coupon Code</div>
                                <div>Discount</div>
                            </div>
                            <div className={style.listitems}>
                                {Coupons.map(item => (
                                    <CouponItem DeletecouponHandler={DeleteCoupon} key={item.id} {...item} />
                                ))}
                            </div>
                            <div className={style.sub}>
                                <div className={style.footertitlee}>Add new Coupon</div>
                                <div className={style.footerd}>
                                    <div className={style.footercontent}>
                                        <div className={style.footerdiv}>
                                            <input className={style.inputco} maxLength={6} value={CouponData.code}
                                                   placeholder={"Coupon code (6 characters ) "} type="text" name="code"
                                                   onInput={handleGetCouponData}/>
                                        </div>
                                        <div className={style.footerdiv}>
                                            <input placeholder={"Discount %"} maxLength={3} value={CouponData.discount}
                                                   className={style.inputco} type="number" name="discount"
                                                   onInput={handleGetCouponData}/>
                                        </div>
                                        <button className={style.addbtn} onClick={AddCouponHandler}>Add</button>

                                    </div>
                                </div>

                                <div className={style.errorWrapper}>
                                    {userInputErrorsData && userInputErrorsData.map(err => <div key={err}  className={style.Errordiv}>{err}</div>)}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CouponsAdminPage;
