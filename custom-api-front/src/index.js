import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NavBar from "./NavBar";
import Posts from "./Posts";
import ItemPosts from "./ItemPosts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateTopic from "./CreateTopic";




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <BrowserRouter >
        <NavBar />
            <Routes>
                <Route path='/' element={<Posts />} />
                <Route path="/item/:id" element={ <ItemPosts /> } />
                <Route path='/create-topic' element={ <CreateTopic />} />
                <Route path={'/create-message/:id'} element={ <CreateTopic />} />
            </Routes>
        </BrowserRouter>

    </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
