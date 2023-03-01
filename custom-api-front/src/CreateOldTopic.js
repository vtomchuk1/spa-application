import {useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

function CreateNewTopic(){

    const params = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState({
        username: '',
        email: '',
        reply: params.id,
        body: '',
        homepage: '',
        captcha: '',
    });
    const [flag, setFlag] = useState(1);
    const [img, setImg] = useState('');

    function onChange(e){
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
        console.log(data);
        console.log('send data');
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
                    <input type="text" className="form-control" id="username" placeholder="Написати логін" value={data.username} onChange={onChange}/>
                </div>
                <div className="create__section">
                    <label className="create__label" htmlFor="email">Пошта</label>
                    <input type="text" className="form-control" id="email" placeholder="Написати пошту" value={data.email} onChange={onChange} />
                </div>
                <div className="create__section">
                    <label className="create__label" htmlFor="title">На яке повідомлення відповідь</label>
                    <input type="text" className="form-control" id="title" placeholder="Написати тему" value={data.reply} onChange={onChange} disabled/>
                </div>
                <div className="create__section create__textarea">
                    <label className="create__label" htmlFor="body">Текст</label>
                    <div className="create__textarea-head">
                        <span><i className="icon-Quote"></i></span>
                        <span><i className="icon-Bold"></i></span>
                        <span><i className="icon-Italic"></i></span>
                        <div className="create__textarea-separate"></div>
                        <span><i className="icon-Share_Topic"></i></span>
                        <span><i className="icon-BlockQuote"></i></span>
                        <span><i className="icon-Performatted"></i></span>
                        <span><i className="icon-Upload_Files"></i></span>
                        <span className="create__textarea-separate"></span>
                        <span><i className="icon-Bullet_List"></i></span>
                        <span><i className="icon-heading"></i></span>
                        <span><i className="icon-Horizontal_Line"></i></span>
                        <span><i className="icon-Emoticon"></i></span>
                        <span><i className="icon-Settings"></i></span>
                        <span><i className="icon-Color_Picker"></i></span>
                        <div className="create__textarea-btn">
                            <a href="#" className="btn">Preview</a>
                        </div>
                    </div>
                    <textarea className="form-control" id="body" placeholder={'Написати текст допису'} value={data.body} onChange={onChange}></textarea>
                </div>
                <div className="create__section">
                    <label className="create__label" htmlFor="homepage">Домашня сторінка</label>
                    <input type="text" className="form-control" id="homepage" placeholder="Написати url" value={data.homepage} onChange={onChange}/>
                </div>
                <div className="create__section">
                    <label className="create__label" htmlFor="homepage">captcha</label>
                    <img src={img} alt={'text'}/>
                    <input type="text" className="form-control" id="captcha" placeholder="captcha" value={data.captcha} onChange={onChange}/>
                </div>
                <div className="create__footer">
                    <a href="#" className="create__btn-create btn btn--type-02" onClick={show}>Створити допис</a>
                </div>
            </div>
        </div>
    );
}

export default CreateNewTopic;