import style from './CartItem.module.css'
import ApiService from "../../Services/ApiService";

const CartItem =({poster,title,price,id,DeleteHandler})=>{


    return <div>

        <div className={style.itemwrapper}>

            <div className={style.content}>
                <img className={style.imgconteiner}  src={`${ApiService.apiBase}/`+poster} alt="Image not found"/>

                <div className={style.rowt}>
                    <div className={style.booktitle}>{title}</div>

                    <div className={style.leftse}>



                    <div className={style.priceevalue}>{price}$</div>

                    <button className={style.removebtn}
                            onClick={()=>DeleteHandler(id)}

                    >

                                        <span className="material-symbols-outlined">
delete
</span>


                    </button>

                    </div>



                </div>


            </div>


        </div>


    </div>

}

export default CartItem;