import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { messageActions } from "../../store/slices/message";

const InfoMessage = () => {
    const message = useSelector(state => state.message.info.message);
    const isdouble = String(message).includes('\\n');
    const dispatch = useDispatch();
    useEffect(() => {
        setTimeout(() => {
            dispatch(messageActions.clearInfo());
        }, 2000);
    }, [dispatch])
    return (
        <div className="alert bg-primary d-flex">
            <div>
                <p className="mx-auto my-auto ">Info !</p>
                <div className="mx-auto my-auto ">{message.split(isdouble ? '\\n' : '\n').map((str, index) => <p key={index} className="m-0">{str}</p>)}</div>
            </div>
        </div>
    );
}

export default InfoMessage;