import style from './RegisterPage.module.css'

import { useNavigate } from 'react-router';
import {   Link } from 'react-router-dom';
import {useEffect, useState} from "react";
import ApiService from "../../../Services/ApiService";

const RegisterPage = ()=>{


    const navigate = useNavigate();
    const [userInputErrorsData, setUserInputErrorsData] = useState([]);
    const [loginData, setLoginData] = useState({ email: '', password: '', repeatpassword: '' });
    const isValidEmail = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

    const handleGetLoginData = (e) => {
        const { value, name } = e.target;
        setLoginData((loginData) => ({
            ...loginData,
            [name]: value
        }));
    };

    const addToErrorsList = (newError) => {
        setUserInputErrorsData((storedErrors) => {
            if (!storedErrors.includes(newError)) {
                return [...storedErrors, newError];
            }
            return storedErrors;
        });
    };

    useEffect(()=>{

        const token = localStorage.getItem("token");
        if(token) {
            navigate("/")
        }


    },[])

    const AddToErrorsList = (newError) => {
        setUserInputErrorsData((storedErrors) => {
            if (!storedErrors.includes(newError)) {
                return [...storedErrors, newError];
            }
            return storedErrors;
        });
    };

    const handleActionLogin = async () => {
        setUserInputErrorsData([]);

        const errors = [];

        const { email, password, repeatpassword } = loginData;

        if (!email.trim()) {
            errors.push('Email is required.');
        } else if (!isValidEmail.test(email.trim())) {
            errors.push('Invalid Email format');
        }

        if (!password.trim()) {
            errors.push('Password is required.');
        } else if (password.trim().length < 6) {
            errors.push('Password should contain at least 6 characters');
        }

        if (password.trim() !== repeatpassword.trim()) {
            errors.push('Passwords do not match.');
        }



        if ( errors.length === 0) {



            try {
                const result = await ApiService.Register(loginData);
                if (result) {

                    console.log('Register  successful');
                    navigate("/")
                } else {

                    setUserInputErrorsData(['Invalid email or password']);
                }
            } catch (error) {

                setUserInputErrorsData([error.message]);
            }








        } else {

            setUserInputErrorsData(errors);
            console.log(userInputErrorsData);
        }
    };



    return (<div>
        <div className={style.Maindiv}>

            <div className={style.Loginwrapper}>
                <div className={style.Logincontainer}>
                    <div className={style.Containertitle}>Sign up now</div>

                    <div className={style.Inputcontainer}>
                        <div className={style.InputTitle}>Email</div>
                        <input className={style.inp} onInput={handleGetLoginData}  name="email" type="text"/>


                    </div>
                    <div className={style.Inputcontainer}>
                        <div className={style.InputTitle}>Password</div>
                        <input className={style.inp} onInput={handleGetLoginData} name="password" type="password"/>


                    </div>

                    <div className={style.Inputcontainer}>
                        <div className={style.InputTitle}>Repeat password</div>
                        <input className={style.inp} onInput={handleGetLoginData} name="repeatpassword"          type="password"/>


                    </div>


                    <div className={style.errorWrapper}>
                        {userInputErrorsData && userInputErrorsData.map(err => <div key={err}
                                                                         className={style.Errordiv}>{err}</div>)}


                    </div>


                    <div className={style.loginfooter}>


                        <button className={style.signinBtn} onClick={handleActionLogin}>

                            Sign up

                        </button>

                        <div className={style.footertitle}>Already have account ? <Link className={style.signuplink}
                                                                                        to="/signin">Sign in</Link>
                        </div>
                    </div>

                </div>


            </div>


        </div>

    </div>)


}

export default RegisterPage;
