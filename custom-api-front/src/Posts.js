import {useState} from "react";
import {Link, Route, useParams} from "react-router-dom";
import axios from 'axios';
import Item from "./Item";

function Posts() {

    const [count, setCount] = useState([]);
    const [flag, setFlag]   = useState(1);
    const [sort, setSort]   = useState(['title', 'desc'])
    const routeParams = useParams();

    if(flag){
        axios.get(`http://127.0.0.1:8000/api/posts/sort/${sort[0]}/${sort[1]}`)
            .then(res => {
                const persons = res.data;
                console.log(persons);
                setCount(persons);
                setFlag(0);
            })
    }

    function custom_sort(name){
        var current_sort = sort[1];
        var next_sort = '';
        if(current_sort == 'desc')
            next_sort = 'asc';
        else
            next_sort = 'desc';
        console.log(next_sort);
        setSort([name, next_sort]);
        setFlag(1);
    }

    return (

        <div class='container'>
            <div className="posts">
                <div className="posts__head">
                    <div className="posts__topic" onClick={() => custom_sort('title')}>Тема</div>
                    <div className="posts__category" onClick={() => custom_sort('email')}>Пошта</div>
                    <div className="posts__users" onClick={() => custom_sort('username')}>Користувач</div>
                    <div className="posts__replies" onClick={() => custom_sort('created_at')}>Час створення</div>


                </div>
                { count.map(items =>
                    <Item id={items.id} title={items.title} email={items.user.email} username={items.user.username} date={items.created_at}/>
                )}

            </div>
        </div>
    );
}

export default Posts;