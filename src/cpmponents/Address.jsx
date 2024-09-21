import React, { useContext, useState } from 'react'
import AppContext from '../context/Appcontext'
import { useNavigate } from 'react-router-dom'

const Address = () => {
  const {shippingAddress,userAddress } = useContext(AppContext)
  const navigate = useNavigate();
  const [formdata , setFormData] = useState({
    fullName:"",
     address:"",
      city:"",
       state:"",
        country:"",
         pincode:"",
          phoneNumber:""
  })

  const onChangeHandler = (e) => {
    const {name,value} = e.target
   setFormData({...formdata, [name]:value})
  }

  const {fullName, address, city, state, phoneNumber, pincode,country} = formdata;
  const submitHandler =async(e) => {
    e.preventDefault();
   const result = await shippingAddress(fullName, address, city, state, country, pincode, phoneNumber);

   if(result.success){
     navigate('/checkout')
     
    } 


    setFormData({

      fullName:"" ,
      address:"",
       city:"",
        state:"",
         phoneNumber:"",
          pincode:"",
        country:""

    })
    // console.log(formdata);
  }
  return (
<>
<div className="container my-3 p-4" style={{ border:'2px solid yellow', borderRadius:'10px'}}>
  <h1 className='text-center'>Shipping Address</h1>
<form onSubmit={submitHandler} className='my-3'>

<div className="row">



<div className="mb-3 col-md-4"> 
  <label for="exampleInputEmail1" className="form-label">Full Name</label>
  <input type="text"
   name='fullName'
   value={formdata.fullName}
   onChange={onChangeHandler}
   className="form-control bg-dark text-light" id="exampleInputEmail2" aria-describedby="emailHelp"/>
</div>

<div className="mb-3 col-md-4">
  <label for="exampleInputEmail1" className="form-label">Country </label>
  <input type="text"
     name='country'
     value={formdata.country}
     onChange={onChangeHandler}
   className="form-control bg-dark text-light" id="exampleInputEmail4" aria-describedby="emailHelp"/>
</div>

<div className="mb-3 col-md-4">
  <label for="exampleInputPassword1" className="form-label">State</label>
  <input type="text"
   name='state'
   value={formdata.state}
   onChange={onChangeHandler}
   className="form-control bg-dark text-light" id="exampleInputPassword1"/>
</div>

</div>

<div className="row">



<div className="mb-3 col-md-4"> 
  <label for="exampleInputEmail1" className="form-label">City</label>
  <input type="text"
   name='city'
   value={formdata.city}
   onChange={onChangeHandler}
   className="form-control bg-dark text-light" id="exampleInputEmail2" aria-describedby="emailHelp"/>
</div>

<div className="mb-3 col-md-4">
  <label for="exampleInputEmail1" className="form-label">Pincode </label>
  <input type="number"
     name='pincode'
     value={formdata.pincode}
     onChange={onChangeHandler}
   className="form-control bg-dark text-light" id="exampleInputEmail3" aria-describedby="emailHelp"/>
</div>

<div className="mb-3 col-md-4">
  <label for="exampleInputPassword1" className="form-label">PhoneNumber</label>
  <input type="number"
   name='phoneNumber'
   value={formdata.phoneaNumber}
   onChange={onChangeHandler}
   className="form-control bg-dark text-light" id="exampleInputPassword1"/>
</div>

</div>

<div className="row">
<div className="mb-3 " >
  <label for="exampleInputPassword1" className="form-label">Address/Nearby</label>
  <textarea
   name='address'
   value={formdata.address}
   onChange={onChangeHandler}
   type="text"
   className="form-control bg-dark text-light" id="exampleInputPassword1"/>
</div>
</div>

 <div className='d-grid col-6 mx-auto my-3  ' >
<button type="submit" className="btn btn-primary" style={{fontWeight:"bold"}}>Submit</button>
</div>
</form>

{
  userAddress && (
    <div className="d-grid col-6 mx-auto my-3 " >
  <button className="btn btn-warning" 
  onClick={()=> navigate('/checkout')}
  style={{fontWeight:"bold"}}
  >Use Old Address</button>
</div>


  )
}


</div>

</>
  )
}

export default Address;