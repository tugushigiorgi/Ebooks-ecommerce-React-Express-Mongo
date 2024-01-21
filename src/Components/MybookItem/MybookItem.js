
import style from './MybookItem.module.css'
import ApiService from "../../Services/ApiService";
import {useNavigate} from "react-router";

const MybookItem=({poster,title ,id})=>{

    const navigate = useNavigate()



    return <div>

        <div className={style.itemwrapper}>

            <div className={style.content}>
                <img className={style.imgconteiner} src={`${ApiService.apiBase}/`+poster} alt="Image not found"/>

                <div>
                    <div className={style.booktitle}>{title}</div>



                    <button className={style.readbookbtn}
                        onClick={()=>{navigate(`/readbook/${id}`)}}
                    >
                        Read book
                    </button>
                </div>


            </div>


        </div>

    </div>


}
export default MybookItem;