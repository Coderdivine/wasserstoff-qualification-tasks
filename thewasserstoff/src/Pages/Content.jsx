import React,{useState,useEffect} from "react";
import {useParams}  from 'react-router-dom'
import {AxiosConnect} from '../AxiosConnect';

function Content() {
    const[edit,setEdit]=useState(false);
    const [data,setData] =useState(null);
    const state_ = ['UNDERSTAND','SOMEWHAT UNDERSTAND','NOT CLEAR','WHAT RUBBISH'];//required state for each break points
    const[item_id,setItem_id]=useState('');//holds the recent item id
    const [post_data,setPost_data] = useState(null)
    const {id} = useParams();
    //Post details...
    const [author,setAuthor]=useState("");
    const[title,setTitle]=useState("");
    const[post,setPost]=useState([]);
    const[text_area,setText_area]=useState("");hold the post content 
    const getDetails=()=>{
        if( id == "new"){
            //check if id passed is equal to new
            setEdit(true);//set edit content to true
            return "new" return some thing random(Not required)
        }else{
        AxiosConnect.post('/blog/a-blog',{id})
        .then(response=>{
             //This function sends query the backend for a particular Blog content 
            setEdit(false);//set edit to false. This means we can evaluate the content given
            const _data = response.data.posts;//returned  value
            console.log(_data);
             setData(_data);//store data to data variable
             setPost_data(JSON.parse(_data.post)); store content to postdata variable
        }).catch(err=>{
            console.log(err.message);
            setEdit(false);
            const msg = err.response.data.message;//Get error message 
            console.log(msg);
            alert(msg);
        })
    }
    }
    useEffect(()=>{
        getDetails();//run function on page reload
    },[])
    const ChangeLevel=(score)=>{
         //This function changes the recent id state.
        console.log({score});
        const data_to_evaluate = {blog_id:id,item_id,score:Number(score)};//This data will be send to the backend for evaluation 
        AxiosConnect.post('/blog/evaluate-post',data_to_evaluate)
        .then(result=>{
            //The result value will be returned. 
            alert("Post Updated");
            console.log(result.data);
        }).catch(err=>{
            console.log(err);//else show error
        })
    }
    const getId =(id)=>{
        setItem_id(id);
    }
    const ConvertToPost=async(arr)=>{
       //this function converts text to json by specifying the break point...
        for(let i = 0;i<arr.length;i++ ){
            const obj = {score:4,color:"green",text:arr[i],item_id:i};
            setPost(posts_ => [...posts_, obj]);
        }
        return post
    }  
    const[text,setText]=useState('Post')
    const Submit=async(e)=>{
        e.preventDefault();
        setText('Posting ...');
         //the code below specify the required regular expressions to split 
        const regex_ = /[.?;:\n,[)(}{\/-]+/
        const split_to_task = text_area.split(regex_);
        const post_ = await ConvertToPost(split_to_task);
        console.log({post_});
        const post_to_string = JSON.stringify(post_);
        const ide = id == "new"?localStorage.getItem("ide"):id;
        const sendData = {author,title,author_id:ide,post:post_to_string};
        AxiosConnect.post('/blog/post-blog',sendData)
        .then(result=>{
            console.log(result.data);
            alert("Posted :)")
        }).catch(err=>{
            const msg = err.response.data.message;
            alert(msg);
            console.log(msg);
            console.log(err.message);
        })
    }
    return (
      <div>
       {
       !edit? <div>
            <div>
                {post_data && post_data.map((el,index)=><div key={index}>
                    <div style={{'display':'grid'}}>
                        <select onChange={(e)=>{
                            const event_ = e.target.value;
                            console.log(event_);
                            getId(el.item_id)
                            ChangeLevel(event_);
                        }}>
                            {state_.map((x,index)=>
                                <option key={index} value={index}>{x}</option>
                                )}
                        </select>
                    </div>
                    <span onClick={()=>getId(el.id)} style={{'color':el.color}}>{el.text}</span>
                </div>)}
            </div>
       </div>:<div>
        {
            id == "new"?<div>
                new
                <input placeholder={'Author name'} value={author} onChange={(e)=>setAuthor(e.target.value)} /><br/>
                <input placeholder={'Title...'} value={title} onChange={(e)=>setTitle(e.target.value)} /><br/>
                <textarea placeholder={'Content...'} rows={20} value={text_area} onChange={(e)=>setText_area(e.target.value)} /><br/>
                <button onClick={(e)=>Submit(e)}>{text}</button>
            </div>:<div>
                old
            </div>
        }
        </div>
        }
      </div>
    );
  }
  
  export default Content;
