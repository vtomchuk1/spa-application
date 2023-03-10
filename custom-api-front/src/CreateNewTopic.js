import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function CreateNewTopic(){

    const [data, setData] = useState({
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

    function onChange(e){
        var username = e.target.id == 'username' ? e.target.value : data.username;
        var email = e.target.id == 'email' ? e.target.value : data.email;
        var title = e.target.id == 'title' ? e.target.value : data.title;
        var body = e.target.id == 'body' ? e.target.value : data.body;
        var homepage = e.target.id == 'homepage' ? e.target.value : data.homepage;
        var captcha = e.target.id == 'captcha' ? e.target.value : data.captcha;

        setData({
            username: username,
            email: email,
            title: title,
            body: body,
            homepage: homepage,
            captcha: captcha,
        });
    }

    function show(){
        console.log(data);
        console.log('send data');
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

    function areastrong(){

        var dddd = data.body;
        dddd += 'test5';
        setData(dddd);
    }

    function areai(){
        alert('press');

    }

    function areaa(){

    }

    function areacode(){

    }

    return (
        <div class='container'>
            <div className="create">
                <div className="create__head">
                    <div className="create__title"><img src="/fonts/icons/main/New_Topic.svg" alt="New topic"/>Створити нове повідомленя</div>
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
                    <label className="create__label" htmlFor="title">Тема</label>
                    <input type="text" className="form-control" id="title" placeholder="Написати тему" value={data.title} onChange={onChange}/>
                </div>
                <div className="create__section create__textarea">
                    <label className="create__label" htmlFor="body">Текст</label>
                    <div className="create__textarea-head">

                        <span><i className="icon-Bold"  ></i></span>
                        <span><i className="icon-Italic" ></i></span>
                        <span><i className="icon-Share_Topic" ></i></span>
                        <span><i className="icon-Performatted" ></i></span>

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