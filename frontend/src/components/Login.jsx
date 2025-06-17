import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Signup() {
          //default value is empty string in "useState("")"
  const [email,setEmail] = useState("");                  //default value is empty string in "useState("")"
  const [password, setPassword] = useState("");           //default value is empty string in "useState("")  


  const navigateTo = useNavigate();
 
  const handleRegister = async(e) => {
    e.preventDefault();                 // calling backend API to register user

    try {
      const {data} = await axios.post("http://localhost:4000/user/login", {
        email,
        password
      },{
        withCredentials:true,
        headers:{
          'Content-Type': 'application/json',                 // for making understand to the backend server that suring login , data will be retrived in json form...check the postman for referance
        }
      })
      console.log(data);
      toast.success(data.message || "User Loggedin Successfully");
      navigateTo("/");
      // Removed saving token in localStorage as backend uses cookies for authentication
      // localStorage.setItem("jwt", data.token);
      setEmail("");
      setPassword("");
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errors || "User Registration Failed");
    }
  }

  return (
    <div className='flex h-screen justify-center items-center bg-gray-200'>
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-xl'>
        <h2 className='text-center text-2xl font-semibold mb-5 text-blue-600'>User Login</h2>
      
        <form onSubmit={handleRegister}>

          <div className='mb-4 '>                                                                                                                             
            <label htmlFor="" className='block mb-2 font-semibold'>Email</label>
            <input type="email" placeholder='Enter Your email Here' className='w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
            value={email}
            onChange={
              (e) =>setEmail(e.target.value)
            }/>
          </div>

          <div className='mb-4 '>                                                                                                                                        
            <label htmlFor="" className='block mb-2 font-semibold'>Password</label>
            <input type="password" placeholder='Enter Your password Here' className='w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
            value={password}
            onChange={
              (e) =>setPassword(e.target.value)
            }/>
          </div>

          <button type='submit' className='w-full bg-blue-600 text-white hover:bg-blue-900 duration-300 rounded-full font-semibold py-3'>Login</button>

          <p className='mt-4 text-center text-gray-600'>Do not have an account? <Link to="/Signup" className='text-blue-600 hover:underline'>SignUp</Link></p>      

        </form>
      </div>
    </div>
  )
}














// import React, { useState } from 'react';
// import { Link, useNavigate } from "react-router-dom";
// import axios from 'axios';
// import toast from 'react-hot-toast';

// export default function Signup() {
//           //default value is empty string in "useState("")"
//   const [email,setEmail] = useState("");                  //default value is empty string in "useState("")"
//   const [password, setPassword] = useState("");           //default value is empty string in "useState("")  


//   const navigateTo = useNavigate()
 
//   const handleRegister = async(e) => {
//     e.preventDefault();                 // calling backend API to register user

//     try {
//       const {data} = await axios.post("http://localhost:4000/user/login", {
//         email,
//         password
//       },{
//         withCredentials:true,
//         headers:{
//           'Content-Type': 'application/json',                 // for making understand to the backend server that suring login , data will be retrived in json form...check the postman for referance
//         }
//       })
//       console.log(data);
//       toast.success(data.message || "User Loggedin Successfully");
//       navigateTo("/");
//       localStorage.setItem("jwt", data.token);
//       setEmail("");
//       setPassword("");
      
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.errors || "User Registration Failed");
//     }
//   }

//   return (
//     <div className='flex h-screen justify-center items-center bg-gray-200'>
//       <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-xl'>
//         <h2 className='text-center text-2xl font-semibold mb-5 text-blue-600'>User Login</h2>
      
//         <form onSubmit={handleRegister}>

//           <div className='mb-4 '>                                                                                                                             
//             <label htmlFor="" className='block mb-2 font-semibold'>Email</label>
//             <input type="email" placeholder='Enter Your email Here' className='w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
//             value={email}
//             onChange={
//               (e) =>setEmail(e.target.value)
//             }/>
//           </div>

//           <div className='mb-4 '>                                                                                                                                        
//             <label htmlFor="" className='block mb-2 font-semibold'>Password</label>
//             <input type="password" placeholder='Enter Your password Here' className='w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
//             value={password}
//             onChange={
//               (e) =>setPassword(e.target.value)
//             }/>
//           </div>

//           <button type='submit' className='w-full bg-blue-600 text-white hover:bg-blue-900 duration-300 rounded-full font-semibold py-3'>Login</button>

//           <p className='mt-4 text-center text-gray-600'>Do not have an account? <Link to="/Signup" className='text-blue-600 hover:underline'>SignUp</Link></p>      

//         </form>
//       </div>
//     </div>
//   )
// }
