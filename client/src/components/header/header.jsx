import React, { useState } from "react";

const Header = () => {
    const [shownav, setShowNav] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const toggleNav = () => {
        setShowNav(prev => !prev);
    }

    return <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#/">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleNav}>
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className={shownav ? " show navbar-collapse" : " collapse navbar-collapse"} id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#/">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#/">Link</a>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
                <ul className="navbar-nav">
                    {
                        !isAuth ? <React.Fragment>
                            <li className="nav-item">
                                <a className="nav-link" href="/login" >LogIn</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/">Register</a>
                            </li>
                        </React.Fragment> : <React.Fragment>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Dropdown
                                </a>
                                <div className="dropdown-menu " aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#/">Action</a>
                                    <a className="dropdown-item" href="#/">Another action</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#/">Something else here</a>
                                </div>
                            </li>
                        </React.Fragment>

                    }


                </ul>

            </div>
        </nav>
    </React.Fragment>;
};
export default Header;