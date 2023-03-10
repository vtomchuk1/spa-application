import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import React from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Link from '@editorjs/link';

function CreateNewTopic(){

    const [dat, setData] = useState({
        username: '',
        email: '',
        title: '',
        body: '',
        homepage: '',
        captcha: '',
    });

    const [flag, setFlag] = useState(1);
    const [img, setImg] = useState('');

    const navigate = useNavigate();


    if(flag){
        axios.get(`http://127.0.0.1:8000/api/create-captcha`)
            .then(res => {
                const persons = 'http://127.0.0.1:8000/' + res.data.name ;
                console.log(persons);
                setImg(persons);
                setFlag(0);
            })
    }

    function onChange(e, flag = 0){


        if(flag){
            var body = flag;
            var username = dat.username;
            var email = dat.email;
            var title = dat.title;
            //var body = e.target.id == 'body' ? e.target.value : data.body;
            var homepage =  dat.homepage;
            var captcha = dat.captcha;
        }
        else
        {
            var body = dat.body;
            var username = e.target.id == 'username' ? e.target.value : dat.username;
            var email = e.target.id == 'email' ? e.target.value : dat.email;
            var title = e.target.id == 'title' ? e.target.value : dat.title;
            //var body = e.target.id == 'body' ? e.target.value : data.body;
            var homepage = e.target.id == 'homepage' ? e.target.value : dat.homepage;
            var captcha = e.target.id == 'captcha' ? e.target.value : dat.captcha;


        }
        setData({
            username: username,
            email: email,
            title: title,
            body: body,
            homepage: homepage,
            captcha: captcha,
        });

        console.log(dat);
    }

    function show(){
        console.log(dat);
        console.log('send data');

        var reg_username = /^[a-zA-Z0-9_-]{2,50}$/;
        var reg_email = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
        var reg_title = /^[a-zA-Zа-яА-Я0-9_-]{2,50}$/;

        let data = {
            username: dat.username.match(reg_username)[0],
            email: dat.email.match(reg_email)[0],
            title: dat.title.match(reg_title)[0],
            body: dat.body,
            homepage: dat.homepage.match(reg_username)[0],
            captcha: dat.captcha.match(reg_username)[0],
        }
        axios.post(`http://127.0.0.1:8000/api/posts`, { data })
            .then(res => {
                if(res.data != 'error') {
                    console.log(res.data.id);
                    navigate(`/item/${res.data.id}`);
                }
                else{
                    alert('error captcha');
                    navigate('/');
                }
            })
    }


    return (
        <div class='container'>
            <div className="create">
                <div className="create__head">
                    <div className="create__title"><img src="/fonts/icons/main/New_Topic.svg" alt="New topic"/>Створити нове повідомленя</div>
                </div>
                <div className="create__section">
                    <label className="create__label" htmlFor="username">Логін</label>
                    <input require  type="text" className="form-control" id="username" placeholder="Написати логін" value={dat.username} onChange={onChange}/>
                </div>
                <div className="create__section">
                    <label className="create__label" htmlFor="email">Пошта</label>
                    <input require type="text" className="form-control" id="email" placeholder="Написати пошту" value={dat.email} onChange={onChange} />
                </div>
                <div className="create__section">
                    <label className="create__label" htmlFor="title">Тема</label>
                    <input require type="text" className="form-control" id="title" placeholder="Написати тему" value={dat.title} onChange={onChange}/>
                </div>
                <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        onChange('1', data);
                        //console.log( 'form : ' + data );
                    } }
                />
                <div className="create__section">
                    <label className="create__label" htmlFor="homepage">Домашня сторінка</label>
                    <input type="text" className="form-control" id="homepage" placeholder="Написати url" value={dat.homepage} onChange={onChange}/>
                </div>
                <div className="create__section">
                    <label className="create__label" htmlFor="homepage">captcha</label>
                    <img src={img} alt={'text'}/>
                    <input require  type="text" className="form-control" id="captcha" placeholder="captcha" value={dat.captcha} onChange={onChange}/>
                </div>
                <div className="create__footer">
                    <a href="#" className="create__btn-create btn btn--type-02" onClick={show}>Створити допис</a>
                </div>
            </div>
        </div>
    );
}

export default CreateNewTopic;