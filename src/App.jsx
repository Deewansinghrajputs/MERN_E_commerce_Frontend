import React, { useContext } from 'react'
import AppContext from './context/Appcontext'
import ShowProduct from './cpmponents/product/ShowProduct'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ProductDetail from './cpmponents/product/ProductDetail'
import Navbar from './cpmponents/Navbar'
import SearchProduct from './cpmponents/product/SearchProduct'
import Register from './cpmponents/user/Register'
import Address from "./cpmponents/Address"
import Checkout from "./cpmponents/Checkout"
import OrderConfirmation from "./cpmponents/OrderConfirmation"


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Login from './cpmponents/user/Login'
import Profile from './cpmponents/user/Profile'
import Cart from './cpmponents/Cart'

const App = () => {
// const {} = useContext(AppContext)
  return ( 
   <>

   <Router>
    <Navbar/>
    <ToastContainer />
    <Routes>
      <Route  path='/' element={<ShowProduct/>}  /> 
      <Route path='/product/search/:term' element={<SearchProduct/>} />
      <Route path='/product/:id' element={<ProductDetail/>} /> 
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/profile' element={<Profile/>} /> 
      <Route  path='/cart' element={<Cart/>}/>
      <Route  path='/shipping' element={ <Address/>}/> 
      <Route  path='/checkout' element={<Checkout/>}/> 
      <Route  path='/oderconfirmation' element={<OrderConfirmation/>}/> 



    </Routes>
   </Router>

  
   </>
  )
}

export default App