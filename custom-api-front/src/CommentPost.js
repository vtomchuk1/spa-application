import {useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

function CommentPost(props){

    const [count, setCount] = useState([]);
    const [flag, setFlag]   = useState(1);
    const params = useParams();

    if(flag){
        axios.get(`http://127.0.0.1:8000/api/posts/reply/${params.id}`)
            .then(res => {
                const persons = res.data;
                //console.log(persons);
                setCount(persons);
                setFlag(0);
            })
    }

    return (
        <div>
        { count.map(items =>
            <div className="topic topic--comment" >
                <div className="topic__head">
                    <div className="topic__avatar">
                        <a href="#" className="avatar"><img src="/fonts/icons/avatars/L.svg"
                                                            alt="avatar"/></a>
                    </div>
                    <div className="topic__caption">
                        <div className="topic__name">
                            <a href="#">{items.user.username}</a>
                        </div>
                        <div className="topic__date"><i className="icon-Watch_Later"></i>{items.created_at.slice(0, 19)}</div>
                    </div>

                </div>
                <div className="topic__content">
                    <div className="topic__text">
                        <p>{items.body}</p>
                    </div>
                </div>
            </div>
        )}
        </div>
    );
}

export default CommentPost;