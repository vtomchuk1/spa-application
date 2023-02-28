import {Link} from "react-router-dom";

function Item(props){

    var date = props.date.slice(0, 10);
    var time = props.date.slice(11,19);

    if(props.title){
        return (
            <div className="posts__body">
            <div className="posts__item">
                <div className="posts__section-left">
                    <div className="posts__topic">
                        <div className="posts__content">
                            <Link to={'/item/' + props.id}>
                                <h3>{props.title}</h3>
                            </Link>
                        </div>
                    </div>
                    <div className="posts__category"><a href="#" className="category">{props.email}</a>
                    </div>
                </div>
                <div className="posts__section-right">
                    <div className="posts__users">
                        <div>
                            <a href="#" className="category">{props.username}</a>
                        </div>
                    </div>
                    <div className="posts__replies">{date}</div>
                    <div className="posts__replies">{time}</div>

                </div>
            </div>

        </div>);
    }
    else
        return ('');
}

export default Item;