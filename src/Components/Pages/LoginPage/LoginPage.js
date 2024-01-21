import style from "./LoginPage.module.css"
import { useNavigate } from 'react-router';
import {   Link } from 'react-router-dom';
import {useEffect, useState} from "react";
import ApiService from "../../../Services/ApiService";

const  LoginPage=()=>{
    const navigate = useNavigate();


    const emailValidationRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

    const [userInputErrorsData, setUserInputErrorsData] = useState([]);
    const [loginData, setLoginData] = useState({ email: '', password: '' });

    const handleGetLoginData = (e) => {
        const { value, name } = e.target;
        setLoginData(loginData => {
            return {
                ...loginData,
                [name]: value
            }
        })
    };

    useEffect(()=>{

        const token = localStorage.getItem("token");
        if(token) {
            navigate("/")
        }


    },[])

    const addToErrorsList = (newError) => {
        setUserInputErrorsData((storedErrors) => {
            if (!storedErrors.includes(newError)) {
                return [...storedErrors, newError];
            }
            return storedErrors;
        });
    };

    const handleActionLogin = async () => {
        setUserInputErrorsData([]);


        const { email, password } = loginData;



        const errors = [];

        if (!email.trim()) {
            errors.push('Email is required.');
        } else if (!emailValidationRegex.test(email.trim())) {
            errors.push('Invalid Email format');
        }

        if (!password.trim()) {
            errors.push('Password is required.');
        } else if (password.trim().length < 6) {
            errors.push('Password should contain at least 6 characters');
        }

        if (errors.length === 0) {

            try {

                const result = await ApiService.Login(loginData);

                if (result) {

                   navigate("/")

                } else {

                    setUserInputErrorsData(['Invalid email or password']);
                }
            } catch (error) {

                setUserInputErrorsData([error.message]);
            }




        } else {
            setUserInputErrorsData(errors);


        }
    };



    return (<div>
        <div className={style.Maindiv}>

            <div className={style.Loginwrapper}>
                <div className={style.Logincontainer}>
                    <div className={style.Containertitle}>Log in</div>

                    <div className={style.Inputcontainer}>
                        <div className={style.InputTitle}>Email</div>
                        <input className={style.inp}  name="email" onInput={handleGetLoginData}  type="text" required={true} />


                    </div>
                    <div className={style.Inputcontainer}>
                        <div className={style.InputTitle}>Password</div>
                        <input className={style.inp}  name="password"  onInput={handleGetLoginData}   type="password"  required={true} />



                    </div>


                    <div className={style.errorWrapper}>
                      {userInputErrorsData && userInputErrorsData.map(err => <div key={err} className={style.Errordiv}>{err}</div>)}


                    </div>


                    <div className={style.loginfooter}>


                  <button className={style.signinBtn} onClick={handleActionLogin}>

                      Sign in

                  </button>

                    <div className={style.footertitle}>Don't have account ?      <Link className={style.signuplink} to="/signup">Sign up</Link> </div>
                </div>

                </div>


            </div>


        </div>

    </div>)


}

export default LoginPage;