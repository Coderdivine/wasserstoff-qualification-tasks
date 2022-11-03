import React,{useState,useEffect} from "react";
import {useParams}  from 'react-router-dom'
import {AxiosConnect} from '../AxiosConnect';
function Posts() {
  const {id} = useParams();
  const [if_arr,setIf_arr] = useState(false);//check if the state array is empty or not.
  const [array,setArray]=useState([])//this state hold the value of user posts
  const getPost = async()=>{
  //This function is called every time the page loads
    AxiosConnect.post("/blog/user-posts",{user_id:id})
    .then(result=>{
///this function send request to the backend to to get user posts
      const data = result.data;
      console.log(data.message)
      console.log(data.posts);
      if(data.posts.length <= 0){
        console.log(data.posts)
      }else{
        setIf_arr(true);
        //console.log({author:data.posts[0].author,title:data.posts[0].title})
        const json = data.posts
        setArray(json);
        console.log(array)
      }
    }).catch(err=>{
           if(err.response){
            const msg = err.response.data.message;
           // alert(msg);
            console.log(msg);
           }
            console.log(err.message);
    })
  }
  const RedirectTo =()=>{
//this function sets post id as new if user wants to create a new post
    window.location = `/posts/new/content`
  }
  const RedirectToPath =(id)=>{
  //This function RedirectTo post content 
    window.location = `/posts/${id}/content`;
  }
  useEffect(()=>{
   getPost();
  },[]);
    return (
      <div>
        {if_arr?
        array !== null && array.length >0 && array.map(x=><div key={x._id}>
          <p>{x.title}</p>
          <small>Author: @{x.author}</small><br/>
          <span>Understanding Level:{x.percentage}</span><br/>
          <button onClick={RedirectToPath(x.ide)}>Read</button>
        </div>)
        :<p>No post yet
          <button onClick={RedirectTo}>Create Post</button></p>}
        
      </div>
    );
  }
  
  export default Posts;
