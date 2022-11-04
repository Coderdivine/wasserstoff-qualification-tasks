import React,{useState,useEffect} from "react";
import {useParams}  from 'react-router-dom'
import {AxiosConnect} from '../AxiosConnect';

function Content() {
    const[edit,setEdit]=useState(false);
    const [data,setData] =useState(null);
    const state_ = [{rate:4,r:'UNDERSTAND'},{rate:3,r:'SOMEWHAT UNDERSTAND'},{rate:2,r:'NOT CLEAR'},{rate:1,r:'WHAT RUBBISH'},{rate:0,r:'CHOOSE RATE'}];
   const[item_id,setItem_id]=useState('');//holds the recent item id
    const [post_data,setPost_data] = useState(null)
    const {id} = useParams();
    //Post details...
    const [author,setAuthor]=useState("");
    const[title,setTitle]=useState("");
    const[post,setPost]=useState([]);
    const[modal,setModal]=useState(false);
    const[percentage,setPercentage]=useState("")
    const[modal_text,setModal_text]= useState("");
    const[text_area,setText_area]=useState("");//hold the post content 
    const getDetails=()=>{
        if( id == "new"){
            //check if id passed is equal to new
            setEdit(true);//set edit content to true
            return "new" //return some thing random(Not required)
        }else{
        AxiosConnect.post('/blog/a-blog',{id})
        .then(response=>{
             //This function sends query the backend for a particular Blog content 
            setEdit(false);//set edit to false. This means we can evaluate the content given
            const _data = response.data.posts;//returned  value
            console.log(_data);
            setPercentage(Math.round(Number(_data.percentage)));//Store the Level of understanding in the percentage variable
             setData(_data);//store data to data variable
             setPost_data(JSON.parse(_data.post)); //store content to postdata variable
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
            getDetails();
            console.log(result.data);
        }).catch(err=>{
            console.log(err);//else show error
        })
    }
    const getId =(id,text)=>{
        setItem_id(id);
        setModal_text(text);
        setModal(true);
    }
    const ConvertToPost=async(arr)=>{
        const new_arr = [];
     for(let i = 0;i<arr.length;i++ ){
            console.log({i,arr:arr.length})
            const obj = {score:4,color:"green",text:arr[i],item_id:i};
            new_arr.push(obj);
        }
        console.log({new_arr})
        setPost(new_arr)
        return new_arr
    }  
    const[text,setText]=useState('Post')
    const Submit=async(e)=>{
        e.preventDefault();
        setText('Posting ...');
         //the code below specify the required regular expressions to split 
        const regex_ = /[.?;:\n,[)(}{\/-]+/
        const split_to_task = text_area.split(regex_);//call the split function in JavaScript to split the regular expressions defined above
        const post_ = await ConvertToPost(split_to_task);//add more item to text like colo, point/score and id
        console.log({post_});
        const post_to_string = JSON.stringify(post_);
        const ide = id == "new"?localStorage.getItem("ide"):id;
        const sendData = {author,title,author_id:ide,post:post_to_string};
        // const newData = post_[Number(item_id)] //= sendData;
        // console.log(newData);
            AxiosConnect.post('/blog/post-blog',sendData)
        .then(result=>{
          //show result in console
            console.log(result.data);
            getDetails();
            setText("Post")
            alert("Article Posted.");
            window.location = `/posts/${ide}`;
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
        <div class="bg-[#D3D3D3] text-white px-8 py-4 m-2"> 
         <p class="font-bold  text-center text-slate-500"> Level of UnderStanding (R) : {percentage}%</p>
        </div>
            {modal?<div>
                        {modal_text}
                        <div>
                        <div style={{display:"grid"}} class="bg-slate-800 bg-opacity-50 flex justify-center items-center fixed top-0 right-0 bottom-0 left-0">
                         <div class="bg-white px-6 py-14 rounded-md text-center">
                             <h1 class="text-xl mb-6 font-bold text-slate-500">{modal_text}</h1>
                         <select onChange={(e)=>{
                            const event_ = e.target.value;
                            console.log(event_);
                            ChangeLevel(event_);
                            setModal(false);
                        }}>
                            {state_.map((x,index)=>
                                <option class="bg-red-500 px-4 py-2 rounded-md text-md text-white"
                                 key={index} value={x.rate}>{x.r}</option>
                                ).reverse()}
                        </select>
                         </div>
                    </div>
                        
                    </div>
                    </div>:<div></div>}
                {post_data && post_data.map((el,index)=><div class="mx-2 mt-4 px-2" key={index}>
                    <span class="non-italic font-bold rounded-lg justify-center bg-[#D3D3D3] cursor-pointer text-center hover:italic" 
                    onClick={()=>getId(el.item_id,el.text)} style={{'color':el.color}}>{el.text}</span>
                </div>)}
            </div>
       </div>:<div>
        {
            id == "new"?<div>
               <div class="flex items-center justify-center p-12">
  <div class="mx-auto w-full max-w-[550px]">
    <div>
      <div class="mb-5">
        <label
          for="Author"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
         Author
        </label>
        <input
          type="text"
          name="Author"
          id="Author"
          placeholder={'Author name'} value={author} onChange={(e)=>setAuthor(e.target.value)} 
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div class="mb-5">
        <label
          for="title"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
         Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder={'Title ...'} value={title} onChange={(e)=>setTitle(e.target.value)} 
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div class="mb-5">
        <label
          for="message"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
          Content
        </label>
        <textarea
          rows="20"
          name="message"
          id="message"
          placeholder="Content ..."
          value={text_area} onChange={(e)=>setText_area(e.target.value)} 
          class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        ></textarea>
      </div>
      <div>
        <button
        onClick={(e)=>Submit(e)}
          class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
        >
          {text}
        </button>
      </div>
    </div>
  </div>
</div>
            </div>:<div>
            <div class="flex items-center justify-center p-12">
  <div class="mx-auto w-full max-w-[550px]">
    <div>
      <div class="mb-5">
        <label
          for="Author"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
         Author
        </label>
        <input
          type="text"
          name="Author"
          id="Author"
          placeholder={'Author name'} value={author} onChange={(e)=>setAuthor(e.target.value)} 
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div class="mb-5">
        <label
          for="title"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
         Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder={'Title ...'} value={title} onChange={(e)=>setTitle(e.target.value)} 
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div class="mb-5">
        <label
          for="message"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
          Content
        </label>
        <textarea
          rows="20"
          name="message"
          id="message"
          placeholder="Content ..."
          value={text_area} onChange={(e)=>setText_area(e.target.value)} 
          class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        ></textarea>
      </div>
      <div>
        <button
        onClick={(e)=>Submit(e)}
          class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
        >
          {text}
        </button>
      </div>
    </div>
  </div>
</div>
           
            </div>
        }
        </div>
        }



























      </div>
    );
  }
  
  export default Content;
