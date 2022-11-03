import React,{useState,useEffect} from "react";
import {useParams}  from 'react-router-dom'
import {AxiosConnect} from '../AxiosConnect';

function Content() {
    const[edit,setEdit]=useState(false);
    const [data,setData] =useState(null);
    const state_ = ['UNDERSTAND','SOMEWHAT UNDERSTAND','NOT CLEAR','WHAT RUBBISH'];
    const[item_id,setItem_id]=useState('');
    const [post_data,setPost_data] = useState(null)
    const {id} = useParams();
    //Post details...
    const [author,setAuthor]=useState("");
    const[title,setTitle]=useState("");
    const[post,setPost]=useState([]);
    const[text_area,setText_area]=useState("");
    const getDetails=()=>{
        if( id == "new"){
            setEdit(true);
            return "new"
        }else{
        AxiosConnect.post('/blog/a-blog',{id})
        .then(response=>{
            setEdit(false);
            const _data = response.data.posts;
            console.log(_data);
             setData(_data);
             setPost_data(JSON.parse(_data.post));
        }).catch(err=>{
            console.log(err.message);
            setEdit(false);
            const msg = err.response.data.message;
            console.log(msg);
            alert(msg);
        })
    }
    }
    useEffect(()=>{
        getDetails();
    },[])
    const ChangeLevel=(score)=>{
        console.log({score});
        const data_to_evaluate = {blog_id:id,item_id,score:Number(score)};
        AxiosConnect.post('/blog/evaluate-post',data_to_evaluate)
        .then(result=>{
            alert("Post Updated");
            console.log(result.data);
        }).catch(err=>{
            console.log(err);
        })
    }
    const getId =(id)=>{
        setItem_id(id);
    }
    const ConvertToPost=async(arr)=>{
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