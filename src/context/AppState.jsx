import React, { useEffect, useState } from 'react'
import AppContext from './Appcontext';
import axios from "axios"

import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const AppState = (props) => {
//  const url = "http://localhost:1000/api";

 const url = "https://mern-e-commerce-api-dprw.onrender.com/api";
 
 const [products, setProducts] = useState([])
 const [token , setToken] = useState([])
 const [isAuthenticated , setIsAuthenticated] = useState(false);
 const [filteredData, setFilteredData] = useState([])
 const [user , setUser] = useState( )
 const [cart , setCart] = useState([])
 const [reload, setReload] = useState(false);
 const [userAddress , setUserAddress] = useState("");
 const [userOrder , setUserOrder] = useState([]);
 
  useEffect(()=>{
    const fetchProduct = async()=>{
      const api = await axios.get(`${url}/product/all`,{
        headers:{
          "context-Type" : "Application/json",
        },
        withCredentials:true,
      });
      console.log(api.data.products);
      setProducts(api.data.products)
      setFilteredData(api.data.products);
      userProfile();
    };
    fetchProduct();   
    userCart();
    getAddress();
    user_Order();

  },[token,reload]);


  const register = async(name,email,password)=>{
    const api = await axios.post(`${url}/user/register`,{name,email,password},{
      headers:{
        "context-Type" : "Application/json",
      },
      withCredentials:true,
    });
 


    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });

    return api.data;
 
  };


  const login = async(email,password)=>{
    const api = await axios.post(`${url}/user/login`,{email,password},{
      headers:{
        "context-Type" : "Application/json",
      },
      withCredentials:true,
    });
 


    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
    // console.log("user login",api.data)
    setToken(api.data.token)
    setIsAuthenticated(true)
    localStorage.setItem("token", api.data.token)
    return api.data;
 
  };

  const logout = () => {
    setIsAuthenticated(false)
    setToken(" ")
    localStorage.removeItem('token')

    
    toast.success("logout successfully..!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });

  }

  const userProfile = async()=>{
    const api = await axios.get(`${url}/user/profile`,{
      headers:{
        "context-Type" : "Application/json",
        Auth : token
      },
      withCredentials:true,
    });
    console.log(api.data);
    setUser(api.data.user)
    // setProducts(api.data.products)
    // setFilteredData(api.data.products)
  };

  useEffect(() => {
    let istoken = localStorage.getItem("token")
    if(istoken) {
      setToken(istoken)
      setIsAuthenticated(true);
    }

  },[])

  const addToCart = async(productId, title, price, qty, imgSrc)=>{
    const api = await axios.post(`${url}/cart/add`,{productId, title, price, qty, imgSrc},{
      headers:{
        "context-Type" : "Application/json",
        Auth:token
      },
      withCredentials:true,
    });
    setReload(!reload)

    // console.log("mu cart" ,api);

    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
    // setProducts(api.data.products)
    // setFilteredData(api.data.products)
  };

  const userCart = async () => {
    const api = await axios.get(`${url}/cart/user`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    //  console.log("user cart ",api.data.cart);
    setCart(api.data.cart);
    //  setUser("user cart ",api);
  };


  const decreseQty = async(productId,qty)=>{
    const api = await axios.post(`${url}/cart/--qty`, {productId,qty},{
      headers:{
        "context-Type" : "Application/json",
        Auth:token
      },
      withCredentials:true,
    });
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });

    // console.log(api.data.products);
    // setProducts(api.data.products)
    // setFilteredData(api.data.products)
  };

  const removeFromCart = async(productId)=>{
    const api = await axios.delete(`${url}/cart/remove/${productId}`,{
      headers:{
        "context-Type" : "Application/json",
        Auth:token
      },
      withCredentials:true,
    });
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });

    // console.log(api.data.products);
    // setProducts(api.data.products)
    // setFilteredData(api.data.products)
  };

  const clearCart = async () => {
    const api = await axios.delete(`${url}/cart/clear`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setReload(!reload);
    // console.log("remove item from cart ",api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    //  setCart(api.data.cart);
    //  setUser("user cart ",api);
  };

  // Add Shipping Address
  const shippingAddress = async (
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber
  ) => {
    const api = await axios.post(
      `${url}/address/add`,
      { fullName, address, city, state, country, pincode, phoneNumber },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    // console.log("remove item from cart ",api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
    //  setCart(api.data.cart);
    //  setUser("user cart ",api);
  };

// get User lastest address
  const getAddress = async()=>{
    const api = await axios.get(`${url}/address/get`,{
      headers:{
        "context-Type" : "Application/json",
        Auth: token
      },
      withCredentials:true,
    });
    // console.log(api.data);
    setUserAddress(api.data.userAddress)
    
  };
// get User order
  const user_Order = async()=>{
    const api = await axios.get(`${url}/payment/userorder`,{
      headers:{
        "context-Type" : "Application/json",
        Auth: token
      },
      withCredentials:true,
    });
    // console.log("user order" ,  api.data);
    setUserOrder(api.data)
 
    
  };

  console.log("user order = ", userOrder);


  

  return( <AppContext.Provider value={{products,register,login,url,token,setIsAuthenticated, isAuthenticated ,setFilteredData,filteredData,logout,user,addToCart,cart,decreseQty,removeFromCart,clearCart,shippingAddress,userAddress,userOrder,}}>
    {props.children}</AppContext.Provider>
)
}

export default AppState