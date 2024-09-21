import React, { useContext, useState } from 'react'
import AppContext from '../../context/Appcontext'
import { useNavigate } from 'react-router-dom'

const  Login = () => {
  const {login} = useContext(AppContext)
  const navigate = useNavigate();
  const [formdata , setFormData] = useState({
    email:"",
    password:""
  })

  const onChangeHandler = (e) => {
    const {name,value} = e.target
   setFormData({...formdata, [name]:value})
  }

  const {email,password} = formdata;
  const submitHandler =async(e) => {
    e.preventDefault();
   const result = await login(email,password);

   if(result.success){
     navigate('/')
     
    } 
  }
  return (
<>
<div className="container my-3 p-4" style={{width:"600px", border:'2px solid yellow', borderRadius:'10px'}}>
  <h1 className='text-center'>User Login</h1>
<form onSubmit={submitHandler} className='my-3'>

<div className="mb-3">
  <label for="exampleInputEmail1" className="form-label">Email </label>
  <input type="email"
     name='email'
     value={formdata.email}
     onChange={onChangeHandler}
   className="form-control" id="exampleInputEmail3" aria-describedby="emailHelp"/>
</div>

<div className="mb-3">
  <label for="exampleInputPassword1" className="form-label">Password</label>
  <input type="password"
   name='password'
   value={formdata.password}
   onChange={onChangeHandler}
   className="form-control" id="exampleInputPassword1"/>
</div>

 <div className='d-grid col-6 mx-auto my-3  '>
<button type="submit" className="btn btn-primary">Login</button>
</div>
</form>
</div>

</>
  )
}

export default Login;