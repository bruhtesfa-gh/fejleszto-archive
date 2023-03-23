import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { messageActions } from "../../store/slices/message";
import { useDispatch, useSelector } from "react-redux";
const StoryDetail = () => {
    const { id } = useParams();
    const [storyFiles, setStoryFiles] = useState([]);
    const [index, setIndex] = useState(-1);
    const [isLoading, setLoading] = useState(false);
    const token = useSelector(state => state.auth.token);
    useEffect(() => {
        setLoading(true);
        axios.get('stories/' + id, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then((res) => {
            if (res.status === 200) {
                setStoryFiles(res.data.files.map(file => 'http://localhost:5000/' + file));
                setIndex(0);
                if (!isVideo(res.data.files[0])) {
                    setTimeout(() => {
                        setIndex(1)
                    }, 2000);
                }
            } else {
                //dispatch(messageActions.setError({ message: res.data.message + "\n" }));
            }
        }).catch((error) => {
            //dispatch(messageActions.setError({ message: error + '\n' }));
        });
        setLoading(false);
    }, []);

    const endVideoHandler = () => {
        setIndex(prev => {
            if (prev === storyFiles.length - 1)
                return -1
            return prev + 1;
        });
    }
    /**
     * check wheater the file is video or not
     * @param {String} url
     * @returns boolean 
     */
    const isVideo = (url) => {
        if (url.includes('.mp4') || url.includes('.mkv') || url.includes('.3gp'))
            return true;
        return false;
    }
    return <React.Fragment>
        <div className="col">
            <div className="vidcontainer ">
                <div className="container_with_message">
                    {
                        isLoading ? <p className="font-weight-bold text-center px-3 pt-5 mt-5">Loading ... </p> :
                            index === -1 ? < p className="font-weight-bold text-center px-3 pt-5 mt-5">No More Story</p> :
                                <div className="controle_container">
                                    {/* <div className="my-progress ">
                                        <div className="progress-width">
                                            <div className="progress-dynamic"></div>
                                        </div>
                                    </div> */}
                                    {
                                        isVideo(storyFiles[index]) ?
                                            <video controls={true} autoPlay={true} src={storyFiles[index]} onEnded={endVideoHandler}></video> :
                                            <img src={storyFiles[index]} />
                                    }

                                </div>

                    }
                </div>
            </div>
        </div>
    </React.Fragment>
}

export default StoryDetail;