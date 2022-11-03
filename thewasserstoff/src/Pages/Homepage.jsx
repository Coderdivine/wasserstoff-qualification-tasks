import React,{useState,useEffect} from "react";
import {AxiosConnect} from '../AxiosConnect';
function Homepage() {
    const [username,setUsername]=useState("");
    const HandleLogin =async()=>{
      //This codes send a response to backend for validation 
      //If user validation is true, user identity will be returned with an enum start with the symbol '@'
        AxiosConnect.post("/user/authenticate-user",{username})
        .then(result=>{
            console.log(result);
            if(result.data.user == "@new_user"){//if enum is new_user, that means a new user was created 
                alert(`Welcome to Feynman Board @${result.data.user_details.username}`)//greetings 
                localStorage.setItem("ide",result.data.user_details.ide);
                window.location = `/posts/${result.data.user_details.ide}`;//redirect to post route to view user posts
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
       <p>Homepage</p>
       <input value={username} placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />
       <br/><button onClick={HandleLogin}>Login</button>
      </div>
    );
  }
  
  export default Homepage;
