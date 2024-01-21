import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import AdminHeader from "../../../AdminHeader/AdminHeader";
import style from "./UpdateBookAdminPage.module.css";
import ApiService from "../../../../Services/ApiService";




const UpdateBookAdminPage = () => {

    const { id } = useParams();
    const [message, setMessage] = useState("");
    const [errorFetchingData, setErrorFetchingData] = useState(false);

    const [userInputErrorsData, setUserInputErrorsData] = useState([]);



    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "Software Development",
        price: "",
    });

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: files ? files[0] : value,
        }));
    };





    useEffect(() => {
        const fetchData = async () => {
            try {
                const { success, data, errorMessage } = await ApiService.GetBookInfoToUpdate(id);

                if (success) {
                    setFormData(data);
                } else {
                    console.error(`Error fetching book information: ${errorMessage}`);
                    setErrorFetchingData(true);
                }
            } catch (err) {
                console.error(err);
                setErrorFetchingData(true);
            }
        };

        fetchData();
    }, [id]);

















    const handleSubmit = async () => {

        setUserInputErrorsData([]);

        const errors = [];

        const {

            title ,
            description ,
            category ,
            price ,

        } = formData;

        if (!title.trim()) {
            errors.push('Title is required.');
        } else if ( title.trim().length < 6) {
            errors.push('Title should contain at least 6 characters.');
        }

        if (!description.trim()) {
            errors.push('Description is required.');
        } else if (description.trim().length < 6) {
            errors.push('Description should contain at least 6 characters.');
        }

        if (!price) {
            errors.push('Price is required.');
        }

        if ( errors.length === 0) {
            try {
                const response = await ApiService.UpdateBook(id, formData);

                if (response.success) {
                    if (response.status === 200) {

                        setMessage("Book updated successfully");
                    } else if (response.status === 400) {
                        setMessage(response.errorMessage.message);
                    }
                } else {
                    setMessage("Book title Already exists,use different.");
                    console.error(response.errorMessage);
                }
            } catch (error) {
                console.error("Error:", error);
            }


        }else{
            setUserInputErrorsData(errors);

        }


    };

    return (
        <div>
            <AdminHeader />
            <div className={style.Mainwrapper}>
                <div className={style.container}>
                    {errorFetchingData && (
                        <div className={style.errormessage}>
                       Book    Id is incorrect
                        </div>
                    )}
                    {message && (
                        <div
                            className={
                                message === "Book updated successfully"
                                    ? style.successerror
                                    : style.errormessage
                            }
                        >
                            {message}
                        </div>
                    )}
                    <div className={style.containertitle}>Update Book</div>
                    <div className={style.content}>

                        <div className={style.Inputcontainer}>
                            <div className={style.InputTitle}>Book Title</div>
                            <input className={style.inp}

                                   name="title"
                                   minLength={6}
                                   value={formData.title} onChange={handleInputChange} type="text"/>


                        </div>


                        <div className={style.Inputcontainer}>
                            <div className={style.InputTitle}>Book Description</div>

                            <textarea
                                name="description"
                                value={formData.description} onChange={handleInputChange}
                                rows={4}
                                cols={50}
                                className={style.descriptioninput}

                            ></textarea>

                        </div>


                        <div className={style.categorypricediv}>

                            <div className={style.categoriesdiv}>

                                <div className={style.categorytitle}>Category</div>
                                <select name="category"

                                        value={formData.category} onChange={handleInputChange}
                                >
                                    <option value="Software Development">Software Development</option>
                                    <option value="Networking">Networking</option>
                                    <option value="Database Management">Database Management</option>
                                    <option value="Machine Learning">Machine Learning</option>
                                    <option value="Cybersecurity">Cybersecurity</option>
                                    <option value="Data Science">Data Science</option>
                                    <option value="Mobile Development">Mobile Development</option>
                                    <option value="Game Development">Game Development</option>
                                    <option value="Software Testing">Software Testing</option>
                                    <option value="DevOps">DevOps</option>
                                    <option value="Cloud Computing">Cloud Computing</option>
                                    <option value="Embedded Systems">Embedded Systems</option>
                                    <option value="NL Processing">NL Processing</option>
                                    <option value="Robotics">Robotics</option>
                                    <option value="Distributed Systems">Distributed Systems</option>
                                    <option value="Ethical Hacking">Ethical Hacking</option>
                                    <option value="GIS">GIS</option>
                                    <option value="Blockchain">Blockchain</option>
                                    <option value="Fintech">Fintech</option>
                                    <option value="AR & VR">AR & VR</option>
                                    <option value="Edge Computing">Edge Computing</option>
                                </select>

                            </div>
                            <div className={style.pricediv}>

                                <div className={style.pricetitle}>Price</div>
                                <input type="number"
                                       name="price"

                                       value={formData.price} onChange={handleInputChange}


                                       className={style.priceinput}/>

                            </div>
                        </div>


                        <div className={style.errorWrapper}>
                            {userInputErrorsData && userInputErrorsData.map(err => <div key={err}
                                                                                        className={style.Errordiv}>{err}</div>)}


                        </div>


                        <div className={style.footerd}>
                            <button onClick={handleSubmit} className={style.uploadbtn}>
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default UpdateBookAdminPage;
