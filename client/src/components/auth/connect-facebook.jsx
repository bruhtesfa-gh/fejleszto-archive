import React from "react";
import './connect-fb.css';
const ConnectFaceBook = () => {
    return <React.Fragment>
        <div className="box">
            <div className="title-box">
                <img src="https://i.postimg.cc/NMyj90t9/logo.png" alt="Facebook" />
                <p className="mt-4">Facebook helps you connect and share with the people in your life.</p>
            </div>
            <div className="form-box">
                <form action="#/">
                    <input type="text" placeholder="Email address or phone number" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">Log In</button>
                    <a href="#/">Forgotten Password</a>
                </form>
                <hr />
                <div className="create-btn">
                    <a href="#/" target="_blank">Create New Account</a>
                </div>
            </div>
        </div>
    </React.Fragment>
}

export default ConnectFaceBook;