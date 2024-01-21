
import styles from './AdminHeader.module.css'

import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router";


const AdminHeader = ()=>{
    const navigete=useNavigate()
    const signout=()=>{

        localStorage.setItem("token", '')
        navigete("/signin")

    }
    return <div>
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <NavLink to="/admin" className={styles.logo}>
                    <div className={styles.logo}>

                        Ebooks Admin

                    </div>
                </NavLink>


                <div className={styles.navelements}>

                    <ul>


                        <li>
                            <NavLink to="/">

                                <div className={styles.navelementdiv}>
                                <span className="material-symbols-outlined">
sell
</span>

                                    <div className={styles.headertitle}>website</div>
                                </div>


                            </NavLink>


                        </li>


                        <li>
                            <NavLink to="/admin/add">

                                <div className={styles.navelementdiv}>
                                <span className="material-symbols-outlined">
add_box
</span>

                                    <div className={styles.headertitle}>Add book</div>
                                </div>


                            </NavLink>


                        </li>

                        <li>
                            <NavLink to="/admin/Coupons">

                                <div className={styles.navelementdiv}>
                                                                     <span className="material-symbols-outlined">
percent
</span>
                                    <div className={styles.headertitle}>Coupons</div>

                                </div>

                            </NavLink>


                        </li>


                    </ul>


                </div>


            </div>

        </nav>

    </div>

}

export default AdminHeader;
