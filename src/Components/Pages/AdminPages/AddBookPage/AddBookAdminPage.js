
import style from './AddBookAdminPage.module.css'
import AdminHeader from "../../../AdminHeader/AdminHeader";
import axios from "axios";
import {useRef, useState} from "react";
import ApiService from "../../../../Services/ApiService";
const AddBookAdminPage  =()=>{


    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Software Development',
        price: '',
        poster: null,
        bookFile: null,
    });

    const [Message,setMessage]=useState("")
    const [userInputErrorsData, setUserInputErrorsData] = useState([]);

    const posterInputRef = useRef();
    const bookFileInputRef = useRef();
    const handleInputChange = (e) => {
        setMessage("")
        const { name, value, files } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: files ? files[0] : value,
        }));
    };
    const handleSubmit = async () => {


        setUserInputErrorsData([]);

        const errors = [];

        const {

            title ,
            description ,
            category,
            price ,
            poster ,
            bookFile ,

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

        if(!poster){
            errors.push('Poster is required.');

        }
        if(!bookFile){
            errors.push('Book PDF  is required.');

        }
        if ( errors.length === 0) {
            try {










                const UploadBook=()=>{

                const formDataToSend = new FormData();
                formDataToSend.append('title', formData.title);
                formDataToSend.append('description', formData.description);
                formDataToSend.append('category', formData.category);
                formDataToSend.append('price', formData.price);
                formDataToSend.append('poster', formData.poster);
                formDataToSend.append('bookFile', formData.bookFile);
                   ApiService.AddNewBook( formData)
                    .then(response=>{

                        if( response &&  response.status===200){
                            setMessage("Book added Successfully")
                            setFormData({
                                title: '',
                                description: '',
                                category: 'Software Development',
                                price: '',
                                poster: null,
                                bookFile: null,
                            });
                            posterInputRef.current.value = '';
                            bookFileInputRef.current.value = '';


                        }else {
                            setMessage( "Error Uploading file")
                        }

                    }).catch(error=>{




                   })
                ;}


                try{

                    let res=await   ApiService.CheckBookByTitle(formData.title)

                    //IF SUCCES BOOK ALREADY EXISTS
                    //SO WE NEED FAILURE !!!!!!!! :))))))))))
                    if(res.success){
                        setMessage( res.errorMessage)

                    }  else{
                        UploadBook()




                    }

                }catch (e){


                }













            } catch (error) {

                console.error('Error:', error);
            }


        } else {

            setUserInputErrorsData(errors);

        }


    };

    return <div>
            <AdminHeader></AdminHeader>
            <div className={style.Mainwrapper}>

                <div className={style.container}>

                    {Message &&


                        <div className={ Message==="Book added Successfully"  ?  style.successerror : style.errormessage}>{Message}</div>}



                    <div className={style.containertitle}>Add new Book</div>


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


                        <div className={style.fileuploadcomponents}>


                            <div className={style.posteruploaddiv}>

                                <div>Upload Poster (jpeg/png)</div>
                                <input type="file" className={style.posterupload}

                                       name="poster"
                                       onChange={handleInputChange}
                                       ref={posterInputRef}

                                       accept="image/jpeg,image/png"/>
                            </div>

                            <div className={style.bookfileuploaddiv}>

                                <div>Upload Book File (pdf)</div>
                                <input type="file" className={style.bookfileupload}
                                       name="bookFile"
                                       onChange={handleInputChange}
                                       ref={bookFileInputRef}
                                       accept="application/pdf"/>
                            </div>


                        </div>


                        <div className={style.errorWrapper}>
                            {userInputErrorsData && userInputErrorsData.map(err => <div key={err}
                                                                                        className={style.Errordiv}>{err}</div>)}


                        </div>
                        <div className={style.footerd}>


                            <button onClick={handleSubmit} className={style.uploadbtn}>Upload</button>
                        </div>


                    </div>


                </div>


            </div>


    </div>
}

export default AddBookAdminPage;