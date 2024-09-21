import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/Appcontext';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';


const Navbar = () => {
const [searchTerm, setSearchTerm] = useState("");
const navigate = useNavigate()
const location = useLocation()

const { setFilteredData , products,logout,isAuthenticated,cart } = useContext(AppContext);

const filterbyCategory = (cat) =>{ setFilteredData(products.filter((data) => data.category.toLowerCase() == cat.toLowerCase()))

}
const filterbyPrice = (price) =>{ setFilteredData(products.filter((data) => data.price >= price))

}

const submitHandler =(e) => {
  e.preventDefault();
  navigate(`/product/search/${searchTerm}`);
  setSearchTerm("")
}
 

  return (
 <>
<div className="nav sticky-top ">
  <div className="nav_bar">
    <Link to={"/"} className="left " style={{textDecoration:'none', color:'white'}}>
      <h3>MERN E-Commerce</h3>
    </Link>
    <form  className="search_bar" onSubmit={submitHandler}>
    
    <span class="material-symbols-outlined">
      search
    </span>

 <input type="text" 
 value={searchTerm}
 onChange={(e)=> setSearchTerm(e.target.value)}
 placeholder='Search Items...' />
    </form>

    <div className="right">
      {
        isAuthenticated && (
          <>
        
          
          <Link to={"/cart"} type="button" className="btn btn-primary position-relative mx-3">
          <span class="material-symbols-outlined">
shopping_cart
</span>

{cart?.items?.length > 0 && (
  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {cart?.items?.length}
    <span className="visually-hidden">unread messages</span>
  </span>

)}

</Link>


      <Link to={'/profile'} className="btn btn-info mx-3">profile</Link>
      <div className="btn btn-danger mx-3" onClick={()=> {
        logout();
        navigate("/")
      }}>logout</div>
  
          </>
        )
      }

      {
        !isAuthenticated && (
          <>
          

      <Link to={'/register'} className="btn btn-info mx-3">register</Link>
      <Link to={'/login'} className="btn btn-secondary mx-3">login</Link>  
  
          
          </>
        )
      }



   
    </div>
  </div>

  {location.pathname == '/' && (
  <div className="sub_bar">
  <div className="item" onClick={()=> setFilteredData(products)} >No Filter</div>
  <div className="item" onClick={()=> filterbyCategory("mobiles")}>Mobiles</div>
  <div className="item" onClick={()=> filterbyCategory("laptops")}>Laptops</div>
  <div className="item" onClick={()=> filterbyCategory("cameras")}>Camera's</div>
  <div className="item" onClick={()=> filterbyCategory("headphones")}>Headphones</div>
  <div className="item" onClick={()=> filterbyPrice(1599)}>15999</div>
  <div className="item" onClick={()=> filterbyPrice(25999)}>25999</div>
  <div className="item" onClick={()=> filterbyPrice(49999)}>49999</div>
  <div className="item" onClick={()=> filterbyPrice(69999)}>69999</div>
  <div className="item" onClick={()=> filterbyPrice(89999)}>89999</div>
</div>

  )}


</div>
 </>
  )
}

export default Navbar