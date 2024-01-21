import styles from './BooksPage.module.css'
import Header from "../../Header/Header";
import {useEffect, useState} from "react";
import BookItem from "../../BookItem/BookItem";


import ApiService from "../../../Services/ApiService";
import apiService from "../../../Services/ApiService";
import {useNavigate} from "react-router";
import {useCart} from "../../../Context/cartContext";


const BooksPage = () => {


    const [state, setState] = useState({
        BookData: [],
        Loading: true,
        CurrentSearchType: 'bycategory',
        FilterParameters: {
            sort: 'asc',
            MaxPrice: 300,
            SearchKeyword: '',
        },
        Category: 'Software Development',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            FilterParameters: {
                ...prevState.FilterParameters,
                [name]: value,
            },
        }));
    };

    const setSearchResults = (searchType, bookData) => {
        setState((prevState) => ({
            ...prevState,
            CurrentSearchType: searchType,
            Loading: false,
            BookData: bookData,
        }));
    };

    const handleError = (error) => {
        setState((prevState) => ({
            ...prevState,
            Loading: false,
            BookData: [],
        }));
        console.log(error.message);
    };

    const SearchBookHandler = async () => {
        try {
            if (!state.FilterParameters.SearchKeyword) return;
            setState((prevState) => ({  ...prevState, Category: ''}));
            const bookData = await ApiService.SearchBookByTitle(
                state.FilterParameters.SearchKeyword.trim()
            );

            setSearchResults('byKeyword', bookData);
        } catch (error) {
            handleError(error);
        }
    };

    const FilterHandler = async () => {
        try {
            if (state.CurrentSearchType === 'byKeyword') {
                const bookData = await ApiService.SearchBookByTitle(
                    state.FilterParameters.SearchKeyword.trim(),
                    state.FilterParameters.MaxPrice,
                    state.FilterParameters.sort
                );

                setSearchResults('byKeyword', bookData);
            } else {
                const params = {
                    category: state.Category,
                    maxprice: state.FilterParameters.MaxPrice,
                    order: state.FilterParameters.sort,
                };

                const bookData = await ApiService.Filterbooks(params);

                setSearchResults('bycategory', bookData);
            }
        } catch (error) {
            handleError(error);
        }
    };

    const Categorybuttonhandler = (name) => {
        setState((prevState) => ({
            ...prevState,
            FilterParameters: {
                ...prevState.FilterParameters,
                SearchKeyword: '',
            },
            Category: name,
        }));
    };

    const FetchBooksByCategory = async () => {
        try {
            setState((prevState) => ({ ...prevState, Loading: true }));
            const bookData = await ApiService.GetBooksByCategory(state.Category);

            setSearchResults('bycategory', bookData);
        } catch (error) {
            handleError(error);
        }
    };

    useEffect(() => {
        if (state.Category) {
            FetchBooksByCategory();
        }
    }, [state.Category]);




    return (
        <div>

            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <div className={styles.Categoriesbar}>
                        <div className={styles.CategoriesHeader}>
                    <span className={`material-symbols-outlined ${styles.cateogriesicon}`}>
                                            category
                                            </span>

                            Categories
                        </div>
                        <div className={styles.Catecogireslist}>
                            <ul className={styles.Categoriesul}>


                                <li   className={state.Category === "Software Development" ? `${styles.activatedbtn}` : ""}>
                                    <button
                                        onClick={() => Categorybuttonhandler("Software Development")}>Software Development
                                    </button>


                                </li>

                                <li className={state.Category === "Networking" ? `${styles.activatedbtn}` : ""}>
                                    <button className={styles.activatedbtn} onClick={() => Categorybuttonhandler("Networking")}>Networking</button>
                                </li>
                                <li className={state.Category === "Database Management" ? `${styles.activatedbtn}` : ""}>
                                    <button onClick={() => Categorybuttonhandler("Database Management")}>Database Management
                                    </button>
                                </li>

                                <li className={state.Category === "Machine Learning" ? `${styles.activatedbtn}` : ""}>
                                    <button onClick={() => Categorybuttonhandler("Machine Learning")}>Machine Learning</button>
                                </li>

                                <li className={state.Category === "Cybersecurity" ? `${styles.activatedbtn}` : ""}>
                                    <button onClick={() => Categorybuttonhandler("Cybersecurity")}>Cybersecurity</button>
                                </li>

                                <li className={state.Category === "Data Science" ? `${styles.activatedbtn}` : ""}>
                                    <button onClick={() => Categorybuttonhandler("Data Science")}>Data Science</button>
                                </li>

                                <li className={state.Category === "Mobile Development" ? `${styles.activatedbtn}` : ""}>
                                    <button onClick={() => Categorybuttonhandler("Mobile Development")}>Mobile Development
                                    </button>
                                </li>

                                <li className={state.Category === "Game Development" ? `${styles.activatedbtn}` : ""}>
                                    <button onClick={() => Categorybuttonhandler("Game Development")}>Game Development</button>
                                </li>

                                <li className={state.Category === "Software Testing" ? `${styles.activatedbtn}` : ""}>
                                    <button onClick={() => Categorybuttonhandler("Software Testing")}>Software Testing</button>
                                </li>

                                <li className={state.Category === "DevOps" ? `${styles.activatedbtn}` : ""}>
                                    <button onClick={() => Categorybuttonhandler("DevOps")}>DevOps</button>
                                </li>
                                <li className={state.Category === "Cloud Computing" ? `${styles.activatedbtn}` : ""}>
                                    <button onClick={() => Categorybuttonhandler("Cloud Computing")}>Cloud Computing</button>
                                </li>
                                <li className={state.Category === "Embedded Systems" ? `${styles.activatedbtn}` : ""}>
                                    <button onClick={() => Categorybuttonhandler("Embedded Systems")}>Embedded Systems</button>
                                </li>
                                <li className={state.Category === "NL Processing" ? `${styles.activatedbtn}` : ""}>
                                    <button onClick={() => Categorybuttonhandler("NL Processing")}>NL Processing</button>
                                </li>

                                <li className={state.Category === "Robotics" ? `${styles.activatedbtn}` : ""}>
                                    <button onClick={() => Categorybuttonhandler("Robotics")}>Robotics</button>
                                </li>

                                <li className={state.Category === "Distributed Systems" ? `${styles.activatedbtn}` : ""}>
                                    <button onClick={() => Categorybuttonhandler("Distributed Systems")}>Distributed Systems
                                    </button>
                                </li>

                                <li className={state.Category === "Ethical Hacking" ? `${styles.activatedbtn}` : ""}>
                                    <button onClick={() => Categorybuttonhandler("Ethical Hacking")}>Ethical Hacking</button>
                                </li>

                                <li className={state.Category === "GIS" ? `${styles.activatedbtn}` : ""}>
                                    <button onClick={() => Categorybuttonhandler("GIS")}>GIS</button>
                                </li>

                                <li className={state.Category === "Blockchain" ? `${styles.activatedbtn}` : ""}>
                                    <button onClick={() => Categorybuttonhandler("Blockchain")}>Blockchain</button>
                                </li>
                                <li className={state.Category === "Fintech" ? `${styles.activatedbtn}` : ""}>
                                    <button onClick={() => Categorybuttonhandler("Fintech")}>Fintech</button>
                                </li>

                                <li className={state.Category === "AR & VR" ? `${styles.activatedbtn}` : ""}>
                                    <button onClick={() => Categorybuttonhandler("AR & VR")}>AR & VR</button>
                                </li>
                                <li className={state.Category === "Edge Computing" ? `${styles.activatedbtn}` : ""} >
                                    <button onClick={() => Categorybuttonhandler("Edge Computing")}>Edge Computing</button>
                                </li>


                            </ul>
                        </div>
                    </div>
                    <div className={styles.Bookcontent}>

                        <div className={styles.searchwrapper}>

                            <div>
                                <input  className={styles.searchinput} name="SearchKeyword"  type="text" value={state.FilterParameters.SearchKeyword}  onChange={handleInputChange}/>
                                <button className={styles.searchBtn} onClick={()=>SearchBookHandler()}>
                            <span className="material-symbols-outlined">
                                    search
                                    </span>
                                </button>
                            </div>
                            <div className={styles.Filtrationdiv}>

                                <div className={styles.namesorting}>

                                    <select name="sort"
                                            onChange={handleInputChange}
                                            value={state.FilterParameters.sort}
                                    >
                                        <option value="asc">Name asc</option>
                                        <option value="desc">Name desc</option>

                                    </select>
                                </div>

                                <div className={styles.PriceFiltering}>

                                    <div className={styles.pricefilteringtitle}>Max price {state.FilterParameters.MaxPrice}</div>
                                    <input
                                        type="range"
                                        className={styles.pricerangerinput}
                                        min="1"
                                        max="200"
                                        name="MaxPrice"
                                        step="1"
                                        value={state.FilterParameters.MaxPrice}
                                        onChange={handleInputChange}
                                    />


                                </div>
                                <button className={styles.filterbtn}
                                        onClick={()=>FilterHandler()}

                                >Filter</button>

                            </div>


                        </div>



                    <div className={styles.bookslistwrapper}>
                        {state.BookData.map((b) => (
                            <BookItem
                                isPurchase={b.isPurchase}
                                Incart={b.Incart}
                                key={b.id}
                                id={b.id}
                                isAdmin={false}
                                price={b.price}
                                Poster={apiService.apiBase + '/' + b.poster}
                                link={b.slug}
                            />
                        ))}


                        {/*Not found banner image Icon*/}
                        {!state.BookData.length && !state.Loading && (
                            <div className={styles.NotFounderror}>
                                <div> Book(s) not found </div>
                                <img src="/a9994415-956e-429d-94f8-0bb872c3c485.png" alt="Error Image not found" />
                            </div>
                        )}
                        {state.Loading && (
                            <div className={styles.NotFounderror}>
                                Loading..
                                <span className="material-symbols-outlined">hourglass_empty</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>  </div> </div>
    );
};

export default BooksPage;