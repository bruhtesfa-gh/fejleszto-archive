import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { messageActions } from "../../store/slices/message";

const SuccessMessage = () => {
    const message = useSelector(state => state.message.success.message);
    const dispatch = useDispatch();
    useEffect(() => {
        setTimeout(() => {
            dispatch(messageActions.clearSuccess());
        }, 2000);
    }, [dispatch])
    return (
        <div className="alert bg-success d-flex">
            <div>
                <p className="mx-auto my-auto ">Success !</p>
                <div className="mx-auto my-auto ">{message.split('\n').map((str, index) => <p key={index} className="m-0">{str}</p>)}</div>
            </div>
        </div>
    );
}

export default SuccessMessage;