import {Link} from "react-router-dom";

function NavBar(){
    return (<header>
        <div className="header js-header js-dropdown">
            <div className="container">
                <div className="header__logo">
                    <h1>
                        <img src="/fonts/icons/main/Logo_Forum.svg" alt="logo" />
                    </h1>
                    <div className="header__logo-btn" data-dropdown-btn="logo">
                        <Link to='/' >
                        SPA
                        </Link>
                    </div>
                </div>
            </div>
            <div className="header__offset-btn">
                <Link to={'/create-topic'}>
                    <img src="/fonts/icons/main/New_Topic.svg" alt="New Topic" />
                </Link>
            </div>
        </div>
    </header>);
}

export default NavBar;