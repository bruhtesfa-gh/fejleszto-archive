import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { messageActions } from "../../store/slices/message";

const ErrorMassage = (props) => {
    const message = useSelector(state => state.message.error.message);
    const dispatch = useDispatch();
    useEffect(() => {
        setTimeout(() => {
            dispatch(messageActions.clearError());
        }, 4000);
    }, [dispatch])
    return (
        <div className="alert bg-danger d-flex my-0" >
            <div>
                <p className="mx-auto my-auto ">Error !</p>
                <div className="mx-auto mt-auto ">{message.split('\n').map((str, index) => <p key={index} className="m-0">{str}</p>)}</div>
            </div>
        </div>
    );
}

export default ErrorMassage;