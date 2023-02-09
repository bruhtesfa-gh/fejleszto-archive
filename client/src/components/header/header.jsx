import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/slices/auth";
import { messageActions } from "../../store/slices/message";
import axios from 'axios';
const Header = () => {
    const [shownav, setShowNav] = useState(false);
    const [showlogout, setShowLogOut] = useState(false);
    const isAuth = useSelector(state => state.auth.loggedin);
    const authUser = useSelector(state => state.auth.username);
    const [isFbConnected, setFBConnected] = useState(false);
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('http://localhost:5000/users/has-fb', {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then((res) => {
            if (res.status === 200) {
                setFBConnected(res.data.isConnected);
            }
        }).catch((error) => {
            dispatch(messageActions.setError({ message: error + '\n' }));
        });
    }, []);

    const toggleNav = () => {
        setShowNav(prev => !prev);
    }

    const dropDownHandler = () => {
        setShowLogOut(prev => !prev);
    }

    const logOutHandler = () => {
        dispatch(authActions.setLogOut());
        dispatch(messageActions.setInfo({ 'message': 'Successfuly logged out' }));
    }

    return <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#/"><img src="/logo192.png" alt="F" style={{ height: '25px' }} />Archive</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleNav}>
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className={shownav ? " show navbar-collapse" : " collapse navbar-collapse"} id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#/">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#/">Export</a>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search Your UGC" aria-label="Search Your UGC" />
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
                                <a className="nav-link dropdown-toggle" href="#/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded={showlogout} onClick={dropDownHandler}>
                                    {authUser}
                                </a>
                                <div className={showlogout ? "dropdown-menu show" : "dropdown-menu "} aria-labelledby="navbarDropdown">
                                    {!isFbConnected && <a className="dropdown-item" href="/connect-fb">Connect with FB</a>}
                                    <a className="dropdown-item" href="#/" onClick={logOutHandler}>Log Out</a>
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
