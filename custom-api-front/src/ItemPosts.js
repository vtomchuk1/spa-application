import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";


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
                        <div className="topic topic--comment">
                            <div className="topic__head">
                                <div className="topic__avatar">
                                    <a href="#" className="avatar"><img src="fonts/icons/avatars/L.svg"
                                                                        alt="avatar"/></a>
                                </div>
                                <div className="topic__caption">
                                    <div className="topic__name">
                                        <a href="#">Larry</a>
                                    </div>
                                </div>
                                <a href="#" className="topic__arrow topic__arrow--up"><i className="icon-Arrow_Up"></i></a>
                            </div>
                            <div className="topic__content">
                                <div className="topic__text">
                                    <p>Can you stop ADP, and create new option for author can create coupon code, Author
                                        will give for their customer. It's better than now.</p>
                                </div>
                            </div>
                            <div className="topic__footer">
                                <div className="topic__footer-likes">
                                    <div><a href="#"><i className="icon-Upvote"></i></a><span>201</span></div>
                                    <div><a href="#"><i className="icon-Downvote"></i></a><span>08</span></div>
                                    <div><a href="#"><i className="icon-Favorite_Topic"></i></a><span>39</span></div>
                                </div>
                                <div className="topic__footer-share">
                                    <div data-visible="desktop"><a href="#"><i className="icon-Share_Topic"></i></a><a
                                        href="#"><i className="icon-Flag_Topic"></i></a><a href="#"><i
                                        className="icon-Bookmark"></i></a></div>
                                    <div data-visible="mobile"><a href="#"><i className="icon-More_Options"></i></a>
                                    </div>
                                    <a href="#"><i className="icon-Reply_Fill"></i></a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemPosts;