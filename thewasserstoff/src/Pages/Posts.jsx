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
 useEffect(()=>{
   getPost();
  },[]);
    return (
      <div>

<section class="antialiased bg-gray-100 text-gray-600 h-screen my-12 px-4" >
    <div class="flex flex-col justify-center h-full">
        <div class="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <div>
          <a class="bg-blue-400 mx-3 my-6 py-3 px-7 rounded-lg text-center text-white font-medium" href={`/posts/new/content`}>Create Post</a>

          </div>
            <header class="px-5 py-4 border-b border-gray-100">
                <div class="font-semibold text-gray-800">Posts</div>
            </header>
            <div class="overflow-x-auto p-3">
                <table class="table-auto w-full">
                    {/* <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                        <tr>
                            
                            <th class="p-2">
                                <div class="font-semibold text-left">Title</div>
                            </th>
                            <th class="p-2">
                                <div class="font-semibold text-left">Author</div>
                            </th>
                            <th class="p-2">
                                <div class="font-semibold text-left">Rate</div>
                            </th>
                        </tr>
                    </thead> */}

                    <tbody class="text-sm divide-y divide-gray-100">
                    {if_arr?
        array !== null && array.length >0 && array.map(x=><div key={x._id}>
          <tr>
                            <td class="p-2">
                                <div class="font-medium text-gray-800">
                                    Title: {x.title.length>15?x.title.substring(0,15)+"...":x.title}
                                </div>
                            </td>
                            <td class="p-2">
                                <div class="text-left">Author: @{x.author}</div>
                            </td>
                            <td class="p-2">
                                <div class="text-left font-medium text-green-500">
                                    R {Math.round(x.percentage)}%
                                </div>
                            </td>
                            <td class="p-2">
                                <div class="flex justify-center"> 
                                    <a class="bg-blue-400 m-3 py-3 px-7 rounded-lg text-center text-white font-medium" href={`/posts/${x.ide}/content`}>Read</a>  
                                </div>
                            </td>
                        </tr>
        </div>)
        :<p>No post yet
          {/* <a class="bg-blue-400 m-3 py-3 px-7 rounded-lg text-center text-white font-medium" href={`/posts/new/content`}>Create Post</a> */}
          </p>}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>

      </div>
    );
  }
  
  export default Posts;
