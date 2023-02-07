import React, { useRef } from "react";
const LogIn = () => {
    const emailref = useRef();
    const passref = useRef();
    const rememberref = useRef();
    const formValidationHandler = (e) => {
        e.preventDefault();
        let invalidform = false;
        let email = emailref.current.value;
        let password = passref.current.value;
        let rememberme = rememberref.current.checked;
        let message = '';

        if (String(email).length === 0) {
            message = "email filled is requied";
        } else {
            if (!String(email).includes('@') || !String(email).includes('.') || String(email).includes(' ')) {
                invalidform = true;
                message = "email should contains @ and . characters \nand never contain empty space. ";
            }
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
                message += "\password filled never contain empty space."
                invalidform = true;
            }
        }

        if (invalidform) {
            console.log(message);
            //dispatch(messageActions.setError({ message: message }));
        } else {
            logInHandler(email, password, rememberme)
        }
    }

    const logInHandler = (email, password, rememberme) => {
        console.log(email, password, rememberme)
    }

    return (
        <div className="col-lg-4 col-md-6 mx-auto mt-4" >
            <div className="row mt-3 mx-3 justify-content-around align-items-center">
                <p className="search_bus mb-0 mr-auto">Sign In</p>
            </div>

            <div className="col mt-2">
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <form onSubmit={formValidationHandler} autoComplete="on">
                            <div className="mb-3">
                                <label>Email address</label>
                                <input ref={emailref}
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    autoComplete="email"
                                />
                            </div>
                            <div className="mb-3">
                                <label>Password</label>
                                <input ref={passref}
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                    autoComplete="current-password"
                                />
                            </div>
                            <div className="mb-3">
                                <div className="custom-control custom-checkbox">
                                    <input
                                        ref={rememberref}
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="customCheck1"
                                        autoComplete="on"
                                    />
                                    <label className="custom-control-label" htmlFor="customCheck1">
                                        Remember me
                                    </label>
                                </div>
                            </div>
                            <div className="">
                                <button type="submit" className="btn btn-primary col">
                                    Submit
                                </button>
                            </div>
                            <p className="forgot-password text-right">
                                Forgot <a href="/forgotten-password">password?</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogIn;