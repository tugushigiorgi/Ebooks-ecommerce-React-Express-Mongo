import  style from './AdminDeleteModal.module.css'

const AdminDeleteModal = ({YesHandler ,CancelBtnHanlder})=>{



    return <div>

        <div id="myModal" className={style.modal}>


            <div className={style.modalcontent}>

                <div className={style.deletetitle}>Are you sure you want to delete this book ?</div>
                <div className={style.btnwrapper}>
                <div className={style.deletebtns}>
                    <button className={style.cancelbtn} onClick={()=>CancelBtnHanlder()} >Cancel</button>
                    <button className={style.deletbtn} onClick={()=>YesHandler()}>Delete</button>


                </div>
                </div>
            </div>
        </div>

    </div>
}

export default AdminDeleteModal;
