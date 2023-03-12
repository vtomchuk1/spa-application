import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NavBar from "./NavBar";
import Posts from "./Posts";
import ItemPosts from "./ItemPosts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateNewTopic from "./CreateNewTopic";
import CreateOldTopic from "./CreateOldTopic";
import {CookiesProvider} from "react-cookie";




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <CookiesProvider>
            <BrowserRouter >
                <NavBar />
                <Routes>
                    <Route path='/' element={<Posts />} />
                    <Route path="/item/:id" element={ <ItemPosts /> } />
                    <Route path='/create-topic' element={ <CreateNewTopic />} />
                    <Route path={'/create-message/:id'} element={ <CreateOldTopic />} />
                </Routes>
            </BrowserRouter>
        </CookiesProvider>
    </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
