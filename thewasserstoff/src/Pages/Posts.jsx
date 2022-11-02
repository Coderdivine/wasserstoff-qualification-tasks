import React,{useState,useEffect} from "react";
import {useParams}  from 'react-router-dom'
import {AxiosConnect} from '../AxiosConnect';
function Posts() {
  const {id} = useParams();
  const [if_arr,setIf_arr] = useState(false);
  const [array,setArray]=useState(null)
  const getPost = async()=>{
    AxiosConnect.post("/blog/user-posts",{user_id:id})
    .then(result=>{
      const data = result.data;
      setIf_arr(true);
      console.log(data.message);
      if(!data.posts){
        console.log(data.posts)
      }else{
        setArray(JSON.parse(data.posts))
      }
    })
  }
  const RedirectTo =()=>{
    window.location = `/posts/new/content`
  }
  useEffect(()=>{
   getPost();
  },[]);
    return (
      <div>
        {if_arr?
        array !== null && array.map(x=><div>
          <p>{x.title}</p>
        </div>)
        :<p>No post yet
          <button onClick={RedirectTo}>Create Post</button></p>}
        
      </div>
    );
  }
  
  export default Posts;