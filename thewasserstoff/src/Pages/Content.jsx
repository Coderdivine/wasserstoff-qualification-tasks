import React,{useState,useEffect} from "react";
import {useParams}  from 'react-router-dom'
import {AxiosConnect} from '../AxiosConnect';

function Content() {
    const[edit,setEdit]=useState(false);
    const [data,setData] =useState(null);
    const state_ = ['UNDERSTAND','SOMEWHAT UNDERSTAND','NOT CLEAR','WHAT RUBBISH'];
    const[current_point,setCurrent_point]=useState('');
    const [post_data,setPost_data] = useState(null)
    const {id} = useParams();
    const getDetails=()=>{
        if( id == "new"){
            setEdit(true);
            return "new"
        }else{
        AxiosConnect.post('/blog/a-blog',{id})
        .then(response=>{
            setEdit(false);
            console.log(JSON.parse(response.data.posts))
            const _data = JSON.parse(response.data.posts)
             setData(_data);
             setPost_data(_data.obj);
        }).catch(err=>{
            console.log(err);
            setEdit(false);
        })
    }
    }
    useEffect(()=>{
        getDetails();
    },[])
    const ChangeState =(id)=>{

    }
    return (
      <div>
       {
       !edit? <div>
        {data.map(x=><div>
            <p>Title: {x.title}</p><br/>
            <span><small>Author: {x.author}</small></span><br/>
            <span>Understanding Rate: {x.percentage}</span>
            <div>
                {post_data.map(el=><div>
                    
                    <span onClick={()=>ChangeState(el.id)} style={{'color':el.color}}>{el.text}</span>
                </div>)}
            </div>
        </div>)}
       </div>:<div>
        {
            id == "new"?<div>
                new
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