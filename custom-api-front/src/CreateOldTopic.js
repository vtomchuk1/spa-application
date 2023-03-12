import React, {useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import UploadFileForm from "./UploadFileForm";
import {useCookies} from "react-cookie";

function CreateNewTopic(){

    const params = useParams();
    const navigate = useNavigate();

    const [dat, setData] = useState({
        username: '',
        email: '',
        reply: params.id,
        body: '',
        homepage: '',
        captcha: '',
    });
    const [flag, setFlag] = useState(1);
    const [img, setImg] = useState('');
    const [file, setFile] = useState(null);

    function updateData(value){
        setFile(value);
        console.log(value);
    }

    function onChange(e, flag = 0){

        if(flag != 0){
            var body = flag;
            var username = dat.username;
            var email = dat.email;
            var reply = dat.reply;
            //var body = e.target.id == 'body' ? e.target.value : data.body;
            var homepage =  dat.homepage;
            var captcha = dat.captcha;
        }
        else
        {
            var body = dat.body;
            var username = e.target.id == 'username' ? e.target.value : dat.username;
            var email = e.target.id == 'email' ? e.target.value : dat.email;
            var reply = e.target.id == 'reply' ? e.target.value : dat.reply;
            //var body = e.target.id == 'body' ? e.target.value : data.body;
            var homepage = e.target.id == 'homepage' ? e.target.value : dat.homepage;
            var captcha = e.target.id == 'captcha' ? e.target.value : dat.captcha;
        }
        setData({
            username: username,
            email: email,
            reply: reply,
            body: body,
            homepage: homepage,
            captcha: captcha,
        });


        /*
        var username = e.target.id == 'username' ? e.target.value : data.username;
        var email = e.target.id == 'email' ? e.target.value : data.email;
        var reply = e.target.id == 'reply' ? e.target.value : data.reply;
        var body = e.target.id == 'body' ? e.target.value : data.body;
        var homepage = e.target.id == 'homepage' ? e.target.value : data.homepage;
        var captcha = e.target.id == 'captcha' ? e.target.value : data.captcha;

        setData({
            username: username,
            email: email,
            reply: reply,
            body: body,
            homepage: homepage,
            captcha: captcha
        });

         */
    }

    if(flag){
        axios.get(`http://127.0.0.1:8000/api/create-captcha`)
            .then(res => {
                const persons = 'http://127.0.0.1:8000/' + res.data.name ;
                console.log(persons);
                setImg(persons);
                setFlag(0);
            })
    }

    function show(){
        console.log(dat);
        console.log('send data');

        var reg_username = /^[a-zA-Z0-9_-]{2,50}$/;
        var reg_email = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
        var reg_reply = /^[0-9]{1,10}$/;

        var img = file;

        let data = {
            username: dat.username.match(reg_username)[0],
            email: dat.email.match(reg_email)[0],
            reply: dat.reply.match(reg_reply)[0],
            body: dat.body,
            homepage: dat.homepage.match(reg_username)[0],
            captcha: dat.captcha.match(reg_username)[0],
            include_file: img,
        };

        console.log('send reg  ' , data);
        axios.post(`http://127.0.0.1:8000/api/posts`, { data })
            .then(res => {
                if(res.data != 'error') {
                    console.log(res.data.id);
                    navigate(`/item/${res.data.reply}`);
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
                    <div className="create__title"><img src="/fonts/icons/main/New_Topic.svg" alt="New topic"/>Написати відповідь на повідомлення</div>
                </div>
                <div className="create__section">
                    <label className="create__label" htmlFor="username">Логін</label>
                    <input type="text" className="form-control" id="username" placeholder="Написати логін" value={dat.username} onChange={onChange}/>
                </div>
                <div className="create__section">
                    <label className="create__label" htmlFor="email">Пошта</label>
                    <input type="text" className="form-control" id="email" placeholder="Написати пошту" value={dat.email} onChange={onChange} />
                </div>
                <div className="create__section">
                    <label className="create__label" htmlFor="title">На яке повідомлення відповідь</label>
                    <input type="text" className="form-control" id="title" placeholder="Написати тему" value={dat.reply} onChange={onChange} disabled/>
                </div>
                <UploadFileForm updateData={updateData}></UploadFileForm>
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
                    <input type="text" className="form-control" id="captcha" placeholder="captcha" value={dat.captcha} onChange={onChange}/>
                </div>
                <div className="create__footer">
                    <a href="#" className="create__btn-create btn btn--type-02" onClick={show}>Створити допис</a>
                </div>
            </div>
        </div>
    );
}

export default CreateNewTopic;