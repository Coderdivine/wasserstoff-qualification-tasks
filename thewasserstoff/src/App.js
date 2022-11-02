import './App.css';
import React,{useState,useEffect} from "react";
import {BrowserRouter,Routes,Route, Link} from "react-router-dom";
import Homepage from './Pages/Homepage'
import Posts from './Pages/Posts'
import Content from './Pages/Content'
function App() {
  return (
    <div>
      <BrowserRouter>
            <Routes>
       <Route  path='/' element={<Homepage/>} />{/* landing page route*/}
       <Route  path='/posts/:id' element={<Posts/>} />{/*User post Route */}
       <Route  path='/posts/:id/content' element={<Content/>} />{/*Post content */}
           </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
