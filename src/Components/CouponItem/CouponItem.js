import style from './CouponItem.module.css'


const CouponItem = ({id,code,discount,DeletecouponHandler})=>{



    return <div>


        <div className={style.wrapper}>



              <div className={style.codetitle}>{code}</div>
                 <div className={style.leftbar}>
                     <div className={style.discouttitle}>{discount}%</div>
                     <button className={style.deletebtn} onClick={()=>DeletecouponHandler(id)}>
                         <span className="material-symbols-outlined">
delete
</span>


                     </button>

                 </div>
        </div>

    </div>
}
export default CouponItem;
