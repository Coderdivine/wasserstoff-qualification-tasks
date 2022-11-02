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
            console.log(err);
            alert(err.message)
        })
    }
    return (
      <div >
       <p>Homepage</p>
       <input value={username} placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />
       <br/><button onClick={HandleLogin}>Login</button>
      </div>
    );
  }
  
  export default Homepage;