import axios, {Axios} from "axios";

class ApiService {
    static apiBase = process.env.REACT_APP_APP_BASE;


    static async CheckCouponCode(code, currentPrice) {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
                `${ApiService.apiBase}/coupon/code/${code}`,
                {},
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }
            );

            if (response && response.status === 200) {
                const discountPercent = response.data.couponDto.discount;
                const discountedPrice = currentPrice - currentPrice * discountPercent / 100;

                return {
                    success: true,
                    discount: discountPercent,
                    currentPrice: discountedPrice,
                    oldPrice: currentPrice,
                    code: response.data.couponDto.code,
                };
            } else {
                return {
                    success: false,
                    errorMessage: 'Invalid coupon code',
                };
            }
        } catch (error) {
            console.error('Error in CheckCouponCode:', error);
            return {
                success: false,
                errorMessage: 'Error checking coupon code',
            };
        }
    }



    static async Login(credentials){

        try {
            const response = await axios.post(`${ApiService.apiBase}/user/login`, credentials);


            if(response.data.token){
                localStorage.setItem("token", response.data.token);
                return true
            }
            return false
        } catch (error) {
            return false
         }

    }

    static async Register(userData){

        try{
            const response = await axios.post(`${ApiService.apiBase}/user/register`,userData);
            if(response.data.token){
                localStorage.setItem("token", response.data.token);
                return true
            }
            return null;

        } catch (error){

            throw error.response ? error.response.data : { message: 'Unable to connect to the server' };

        }

    }


    static async GetUserCart() {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get(`${ApiService.apiBase}/cart/usercart`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });

            if (response && response.status === 200) {
                return {
                    cartData: response.data.Dto.CartDto,
                    userBalance: response.data.Dto.UserBallance,
                };
            } else {
                return {
                    cartData: [],
                    userBalance: 0,
                };
            }
        } catch (error) {


        }
    }


    static async DeleteCartItem(CartItemId) {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.delete(`${ApiService.apiBase}/cart/book/${CartItemId}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });

            return {
                success: response && response.status === 200,
                errorMessage: response && response.data && response.data.message,
            };
        } catch (error) {
            console.error('Error in DeleteCartItem:', error);
            return {
                success: false,
                errorMessage: 'Error deleting cart item',
            };
        }
    }



    static async Checkout(CouponCode=null, CurrentPrice) {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
                `${ApiService.apiBase}/cart/checkout`,
                { CouponCode, CurrentPrice },
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }
            );

            if(response && response.status === 200){



            return {
                success: true,
                data: response.data,
            };}

                return {
                    success: false,
                    data: null,
                };



        } catch (error) {
            console.error('Error in Checkout:', error);
            return {
                success: false,
                data: null,
                errorMessage: 'Error during checkout',
            };
        }
    }



    static async DeleteCart() {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.delete(`${ApiService.apiBase}/cart/delete`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });

            return {
                success: response && response.status === 200,
                errorMessage: response && response.data && response.data.message,
            };
        } catch (error) {
            console.error('Error in DeleteCart:', error);
            return {
                success: false,
                errorMessage: 'Error deleting cart',
            };
        }
    }



    static async AddToCart(id) {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
                `${ApiService.apiBase}/cart/add/${id}`,
                {},
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }
            );

            return response && response.status === 200;
        } catch (error) {
            console.error('Error in AddToCart:', error);
            throw error;
        }
    }





    static async HeaderInfo(){
        const token = localStorage.getItem("token");


        try {
            const response = await axios.get(`${ApiService.apiBase}/user/headerinfo`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });

            return {
                success: response && response.status === 200,
                data: response.data || [],
                errorMessage: response && response.data && response.data.message,
            };
        } catch (error) {
            console.error('Error in GetUserBooks:', error);
            throw error;
        }





    }



    //Book Section Codes


    static async getBookPdf(bookid){
        const token = localStorage.getItem("token");


        try{
            return await   axios.get(`${ApiService.apiBase}/book/read/${bookid}`,
                {
                headers: {
                Authorization: 'Bearer ' + token
            }}


        )
        }catch (e){
            console.log(e)
        }



    }






    static async GetUserBooks() {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get(`${ApiService.apiBase}/book/user/mybooks`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });


            if (response && response.status === 200  ) {
                return response.data.userBooks;
            } else {

                throw new Error(`Error fetching user books. Status: ${response.status}`);
            }
        } catch (error) {

            throw error;
        }
    }


    static async GetBooksByCategory(categoryName) {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get(`${ApiService.apiBase}/book/category/${categoryName}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });

            if (response && response.status ===200) {
                return response.data.booksDTO || [];
            } else {
                throw new Error(`failed with status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error in :', error);
            throw error;
        }
    }




    static async GetBookInfoToUpdate(bookId) {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get(`${ApiService.apiBase}/book/update/${bookId}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });

            return {
                success: response && response.status === 200,
                data: response.data || {},
                errorMessage: response && response.data && response.data.message,
            };
        } catch (error) {
            console.error(`Error in GetBookInfoToUpdate for ID ${bookId}:`, error);
            return {
                success: false,
                data: {},
                errorMessage: 'Error fetching book information for update',
            };
        }
    }




    static async GetAllBooks() {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get(`${ApiService.apiBase}/book/parse/all`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });

            return {
                success: response && response.status === 200,
                data: response.data.booksDTO || [],
                errorMessage: response && response.data && response.data.message,
            };
        } catch (error) {
            console.error('Error in GetAllBooks:', error);
            return {
                success: false,
                data: [],
                errorMessage: 'Error fetching all books',
            };
        }
    }







    static async SearchBookByTitle(keyword, maxprice = 300, order = "asc") {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get(
                `${ApiService.apiBase}/book/searchby/?keyword=${keyword}&maxprice=${maxprice}&order=${order}`,
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }
            );

            if (response &&  response.status === 200) {
                return response.data.booksDTO || [];
            } else {
                throw new Error(`SearchBookByTitle failed with status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error in SearchBookByTitle:', error);
            throw error;
        }
    }



    static async Filterbooks(params) {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get(
                `${ApiService.apiBase}/book/filter/?category=${params.category}&maxprice=${params.maxprice}&order=${params.order}`,
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }
            );

            if (response && response.status === 200) {
                return response.data.booksDTO || [];
            } else {
                throw new Error(`failed with status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error in :', error);
            throw error;
        }
    }



    static async RandomCouponForBanner() {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get(`${ApiService.apiBase}/coupon/random`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });

            if (response && response.data.couponDto) {
                return {
                    CouponCode: response.data.couponDto.code,
                    Discount: response.data.couponDto.discount,
                };
            } else {
                return {
                    CouponCode: null,
                    Discount: null,
                };
            }
        } catch (error) {
            // Handle errors, log them or throw an error if needed
            console.error('Error ', error);
            throw error;
        }
    }




    static async NewBooksFeed() {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get(`${ApiService.apiBase}/book/feed/newbooks`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });

            if (response && response.data.booksDTO) {
                return response.data.booksDTO;
            } else {
                return [];
            }
        } catch (error) {

            console.error('Error in NewBooksFeed:', error);
            throw error;
        }
    }



    static async DeleteBookById(id) {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.delete(`${ApiService.apiBase}/book/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });

            return {
                success: response && response.status === 200,
                errorMessage: response && response.data && response.data.message,
            };
        } catch (error) {
            console.error(`Error in DeleteBookById for ID ${id}:`, error);
            return {
                success: false,
                errorMessage: 'Error deleting book',
            };
        }
    }





    static async GetBookbySlug(slug) {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get(`${ApiService.apiBase}/book/get/${slug}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });


            if (response && response.status === 200 ) {
                return response.data.bookDto;
            } else {

                throw new Error(`Error fetching book by slug. Status: ${response.status}`);

            }
        } catch (error) {
            console.error('Error in GetBookbySlug:', error);
            throw error;
        }
    }







    static async UpdateBook(id, bookData) {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.put(`${ApiService.apiBase}/book/update/${id}`, bookData, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });

            return {
                status: response && response.status,
                success: response && response.status === 200,
                errorMessage: response && response.data && response.data.message,
            };
        } catch (error) {
            console.error(`Error in UpdateBook for ID ${id}:`, error);
            return {
                status: error.response && error.response.status,
                success: false,
                errorMessage: 'Error updating book',
            };
        }
    }




    static async CheckBookByTitle(title) {
        try {
            const response = await axios.get(`${ApiService.apiBase}/book/check/bytitle/${title}`);

            return {
                success: response && response.status === 200,
                errorMessage: response && response.data && response.data.message,
            };
        } catch (error) {

            return {
                success: false,
                errorMessage: "Internal server error",
            };
        }
    }



    static  async AddNewBook(formdata){
           const token = localStorage.getItem("token");

           try {
               return await axios.post(`${ApiService.apiBase}/book/add`, formdata, {
                   headers: {
                       'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token
                   }
               });
           } catch (error) {
               console.log(error);
           }

       }

    //End of Book Section Codes


    //Coupon Section ---



    static async GetAllCoupons() {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get(`${ApiService.apiBase}/coupon/all`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });

            return {
                success: response && response.status === 200,
                data: response.data.couponDTO || [],
                errorMessage: response && response.data && response.data.message,
            };
        } catch (error) {
            console.error('Error in GetAllCoupons:', error);
            return {
                success: false,
                data: [],
                errorMessage: 'Error fetching all coupons',
            };
        }
    }




    static async FindCouponByCode(code){
        const token = localStorage.getItem("token");

        try{
            return await axios.get(`${ApiService.apiBase}/coupon/code`, {

                    code
            },    {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })



        }catch (error){


            console.log(error)

        }



    }




    static async DeleteCouponById(id) {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.delete(`${ApiService.apiBase}/coupon/delete/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });

            return {
                success: response && response.status === 200,
                errorMessage: response && response.data && response.data.message,
            };
        } catch (error) {
            console.error(`Error in DeleteCouponById for ID ${id}:`, error);
            return {
                success: false,
                errorMessage: 'Error deleting coupon',
            };
        }
    }



    static async AddNewCoupon(code, discount) {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
                `${ApiService.apiBase}/coupon/add`,
                {
                    code: code,
                    discount: discount,
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }
            );

            return {
                success: response && response.status === 200,
                data: response.data,
                errorMessage: response && response.data && response.data.message,
            };
        } catch (error) {
            console.error('Error in AddNewCoupon:', error);
            return {
                success: false,
                errorMessage: 'Error adding new coupon',
            };
        }
    }





    static async isAdmin(){
        const token = localStorage.getItem("token");

        try{
       return await    axios.get( `${ApiService.apiBase}/user/isadmin` ,
              { headers: {
                Authorization: 'Bearer ' + token
            }
        }
              )

        }catch (error){

        }



    }




}
export default ApiService;