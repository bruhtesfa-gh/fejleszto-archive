import React, { useRef } from "react";
import './connect-fb.css';
import axios from 'axios'
import { messageActions } from "../../store/slices/message";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const ConnectFaceBook = () => {
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const emailref = useRef();
    const passref = useRef();
    const navigate = useNavigate();

    const formValidationHandler = (e) => {
        e.preventDefault();
        let invalidform = false;
        let email = emailref.current.value;
        let password = passref.current.value;
        let message = '';

        if (String(email).length === 0) {
            message = "email filled is requied";
        } else {
            // if (!String(email).includes('@') || !String(email).includes('.') || String(email).includes(' ')) {
            //     invalidform = true;
            //     message = "email should contains @ and . characters \nand never contain empty space. ";
            // }
        }

        if (String(password).length === 0) {
            invalidform = true;
            message += "\npassword filled is requied";
        } else {
            if (String(password).length < 8) {
                invalidform = true;
                message += "\npassword filed should be at least 8 characters";
            }

            if (String(password).includes(' ')) {
                message += "\npassword filled never contain empty space."
                invalidform = true;
            }
        }

        if (invalidform) {
            dispatch(messageActions.setError({ message: message }));
        } else {
            ConnectHandler(email, password)
        }
    }

    const ConnectHandler = (email, password) => {
        axios.post('https://fejleszto-archive.onrender.com/connect/facebook', { username: email, password }, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            if (res.status === 200) {
                dispatch(messageActions.setSuccess({ message: res.data.message + "\n" }));
            } else {
                dispatch(messageActions.setError({ message: res.data.message + "\n" }));
            }
            navigate('/')
        }).catch(error => {
            dispatch(messageActions.setError({ message: error + "\n" }));
        })
    }

    return <React.Fragment>
        <div className="box">
            <div className="title-box">
                <img src="https://i.postimg.cc/NMyj90t9/logo.png" alt="Facebook" />
                <p className="mt-4">Facebook helps you connect and share with the people in your life.</p>
            </div>
            <div className="form-box">
                <form onSubmit={formValidationHandler}>
                    <input type="text" placeholder="Email address or phone number" ref={emailref} />
                    <input type="password" placeholder="Password" ref={passref} />
                    <button type="submit">Log In</button>
                    {/* <a href="#/">Forgotten Password</a> */}
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