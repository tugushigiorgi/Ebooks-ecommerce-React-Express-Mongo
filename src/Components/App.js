
import { BrowserRouter as Router, Route, Routes , Switch} from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import MainPage from "./Pages/MainPage/MainPage";
import DetailedPage from "./Pages/DetailedPage/DetailedPage";
import MyBooks from "./Pages/Mybooks/MyBooks";
import BooksPage from "./Pages/BooksPage/BooksPage";
import AddBookAdminPage from "./Pages/AdminPages/AddBookPage/AddBookAdminPage";
import MainAdminPage from "./Pages/AdminPages/MainAdminPage/MainAdminPage";
import UpdateBookAdminPage from "./Pages/AdminPages/UpdateBook/UpdateBookAdminPage";
import CouponsAdminPage from "./Pages/AdminPages/CouponsAdminPage/CouponsAdminPage";
import ReaderPage from "./Pages/ReaderPage/ReaderPage";
import {CartProvider} from "../Context/cartContext";
import CartModal from "./CartModal/CartModal";
import Header from "./Header/Header";
import WithAuth from "./HOC/WithAuth";
import WithAdminAuth from "./HOC/WithAdminAuth";



function App() {










    return (
      <Router>

          <CartProvider>
              <Routes>
                  <Route path="/"
                         element={

                             <WithAuth>
                                 <Header></Header>
                                 <MainPage />
                             </WithAuth>
                     } />

                  <Route path="/book/:slug"
                         element={
                  <WithAuth>
                      <Header></Header>
                      <DetailedPage />
                  </WithAuth>} />

                  <Route path="/mybooks"
                         element={
                  <WithAuth>
                      <Header></Header>
                      <MyBooks />
                  </WithAuth>}/>
                  <Route path="/books" element={
                      <WithAuth>
                          <Header></Header>
                      <BooksPage />
                  </WithAuth>} />




                  <Route
                      path="/admin"
                      exact
                      element={
                      <WithAdminAuth>
                          <MainAdminPage />
                      </WithAdminAuth>}
                  />


                  <Route path="*" element={<div></div>}/>

              </Routes>


          </CartProvider>



        <Routes>

          <Route
              path="/signin"
              exact
              element={<LoginPage />}
          />
            <Route
                path="/signup"
                exact
                element={<RegisterPage />}
            />



            <Route
        path={"/readbook/:bookid"}
          exact
            element={
            <WithAuth>
                <ReaderPage/>
            </WithAuth>} />
            <Route
              path="/admin/add"
              exact element={
                  <WithAdminAuth>

                  <AddBookAdminPage />

                  </WithAdminAuth>
            }/>

            <Route
              path="/admin/update/:id"
              exact
              element={
                <WithAdminAuth>
                    <UpdateBookAdminPage/>
                </WithAdminAuth>
            }
          />
            <Route path="*" element={<div></div>}/>
             <Route
              path="/admin/Coupons"
              exact
              element={
                  <WithAdminAuth>
                      <CouponsAdminPage />
                  </WithAdminAuth>


             }
          />




        </Routes>




      </Router>
  );




}

export default App;
