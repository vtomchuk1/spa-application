import {useState} from "react";
import {Link, Route, useParams} from "react-router-dom";
import axios from 'axios';

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
                    <div className="posts__users">Користувач</div>
                    <div className="posts__replies" onClick={() => custom_sort('created_at')}>Дата</div>
                    <div className="posts__views">Час</div>

                </div>
                { count.map(items =>
                    <div className="posts__body">

                        <div className="posts__item">
                            <div className="posts__section-left">
                                <div className="posts__topic">
                                    <div className="posts__content">
                                        <Link to={'/item/' + items.id}>
                                            <h3>{items.title}</h3>
                                        </Link>
                                    </div>
                                </div>
                                <div className="posts__category"><a href="#" className="category">{items.user.email}</a>
                                </div>
                            </div>
                            <div className="posts__section-right">
                                <div className="posts__users">
                                    <div>
                                        <a href="#" className="avatar"><img src="fonts/icons/avatars/A.svg" alt="avatar"/></a>
                                    </div>
                                </div>
                                <div className="posts__replies">20.02.2022</div>
                                <div className="posts__replies">16:45</div>

                            </div>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}

export default Posts;