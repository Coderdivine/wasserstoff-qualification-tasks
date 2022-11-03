import React,{useState,useEffect} from "react";
import {useParams}  from 'react-router-dom'
import {AxiosConnect} from '../AxiosConnect';
function Posts() {
  const {id} = useParams();
  const [if_arr,setIf_arr] = useState(false);
  const [array,setArray]=useState([])
  const getPost = async()=>{
    AxiosConnect.post("/blog/user-posts",{user_id:id})
    .then(result=>{
      const data = result.data;
      console.log(data.message)
      console.log(data.posts);
      if(data.posts.length <= 0){
        console.log(data.posts)
      }else{
        setIf_arr(true);
        //console.log({author:data.posts[0].author,title:data.posts[0].title})
        const json = data.posts
        setArray(json);//arr_ => [...arr_, json]
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
    window.location = `/posts/new/content`
  }
  const RedirectToPath =(id)=>{
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