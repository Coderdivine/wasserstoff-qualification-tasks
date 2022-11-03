import React,{useState,useEffect} from "react";
import {AxiosConnect} from '../AxiosConnect';
function Homepage() {
    const [username,setUsername]=useState("");
    const HandleLogin =async()=>{
        AxiosConnect.post("/user/authenticate-user",{username})
        .then(result=>{
            console.log(result);
            if(result.data.user == "@new_user"){
                alert(`Welcome to Feynman Board @${result.data.user_details.username}`)
                localStorage.setItem("ide",result.data.user_details.ide);
                window.location = `/posts/${result.data.user_details.ide}`;
            }else{
                localStorage.setItem("ide",result.data.user_details.ide);
                alert(`Welcome back ${username}`)
                window.location = `/posts/${result.data.user_details.ide}`;
            }
        }).catch(err=>{
            const msg = err.response.data.message;
            alert(msg);
            console.log(msg);
            console.log(err.message);
        })
    }
    return (
      <div >
<div class="bg-[#fff] h-screen overflow-hidden flex items-center justify-center">
  <div class="bg-white lg:w-5/12 md:6/12 w-10/12 shadow-3xl">
    <form class="p-12 md:p-24">
        <p  class="bg-white mx-4 mx-5 py-4 px-4 font-bold">Faynman Board</p>
      <div class="flex items-center text-lg mb-6 md:mb-8">
        <svg class="absolute ml-3" width="24" viewBox="0 0 24 24">
          <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/>
        </svg>
        <input  value={username} placeholder="Username" onChange={(e)=>setUsername(e.target.value)} type="text" id="username" class="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full" />
      </div>
      <button onClick={HandleLogin} class="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full">Login</button>
    </form>
  </div>
 </div>
      </div>
    );
  }
  
  export default Homepage;