import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import CommentPost from "./CommentPost";


function ItemPosts(){

    const [count, setCount] = useState({
        user : '',

    });
    const routeParams = useParams();

    function req() {
        var a = routeParams.id;
        axios.get(`http://127.0.0.1:8000/api/posts/${a}`)
            .then(res => {
                const persons = res.data;
                setCount(persons);
            }, [])
    }

    return(
        <div class='container' onLoad={req} >
            <div className="topics">
                <div className="topics__heading">
                    <h2 className="topics__heading-title">{count.title}</h2>
                    {console.log(count)}
                </div>
                <div className="topics__body">
                    <div className="topics__content">
                        <div className="topic">
                            <div className="topic__head">
                                <div className="topic__avatar">
                                    <a href="#" className="avatar"><img src="/fonts/icons/avatars/B.svg"
                                                                        alt="avatar"/></a>
                                </div>
                                <div className="topic__caption">
                                    <div className="topic__name">
                                        <a href="#">{ count.user.username   }</a>
                                    </div>
                                    <div className="topic__date"><i className="icon-Watch_Later"></i>{count.created_at}</div>
                                </div>
                            </div>
                            <div className="topic__content">
                                <div className="topic__text">
                                    <p>{count.body}</p>

                                </div>
                                <div className="topic__footer">
                                    <div className="topic__footer-share">
                                        <Link to={'/create-message/' + count.id}>
                                            <a href="#"><i className="icon-Reply_Fill"></i></a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <CommentPost/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemPosts;