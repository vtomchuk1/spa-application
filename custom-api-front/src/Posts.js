import {useState} from "react";
import {useParams} from "react-router-dom";
import axios from 'axios';

function Posts() {

    const [count, setCount] = useState([]);
    const [flag, setFlag]   = useState(1);
    const routeParams = useParams();

    if(flag){
        axios.get(`http://127.0.0.1:8000/api/posts/`)
            .then(res => {
                const persons = res.data;
                setCount(persons);
                setFlag(0);
            })
    }

    return (

        <div class='container'>
            <div className="posts">
                <div className="posts__head">
                    <div className="posts__topic">Topic</div>
                    <div className="posts__category">Category</div>
                    <div className="posts__users">Users</div>
                    <div className="posts__replies">Replies</div>
                    <div className="posts__views">Views</div>
                    <div className="posts__activity">Activity</div>
                </div>
                { count.map(items =>
                    <div className="posts__body">

                        <div className="posts__item">
                            <div className="posts__section-left">
                                <div className="posts__topic">
                                    <div className="posts__content">
                                        <a href="#">
                                            <h3>{items.title}</h3>
                                        </a>
                                    </div>
                                </div>
                                <div className="posts__category"><a href="#" className="category">politic</a>
                                </div>
                            </div>
                            <div className="posts__section-right">
                                <div className="posts__users">
                                    <div>
                                        <a href="#" className="avatar"><img src="fonts/icons/avatars/A.svg" alt="avatar"/></a>
                                    </div>
                                    <div>
                                        <a href="#" className="avatar"><img src="fonts/icons/avatars/G.svg" alt="avatar"/></a>
                                    </div>
                                    <div>
                                        <a href="#" className="avatar"><img src="fonts/icons/avatars/P.svg" alt="avatar"/></a>
                                    </div>
                                </div>
                                <div className="posts__replies">31</div>
                                <div className="posts__views">14.5k</div>
                                <div className="posts__activity">13d</div>
                            </div>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}

export default Posts;