import React, { useEffect, useState } from "react";
import axios from 'axios'
import { messageActions } from "../../store/slices/message";
import { useDispatch, useSelector } from "react-redux";
import '../story.css';
const Dashboard = () => {
    const [stories, setStories] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get('http://localhost:5000/facebook/stories', {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then((res) => {
            if (res.status === 200) {
                setStories(res.data);
                setLoading(false);
            } else {
                dispatch(messageActions.setError({ message: res.data.message + "\n" }));
            }
        }).catch((error) => {
            dispatch(messageActions.setError({ message: error + '\n' }));
        });
    }, []);

    return <React.Fragment>
        <div className="col ">
            <div className="row justify-content-center mt-2">
                {
                    stories.map(story => {
                        return <div className="mx-2 story-container" style={{ backgroundImage: `url(${story.picture})` }}>
                            <div className="rounded">
                                <div>

                                </div>
                            </div>
                            <span className="">{story.name}</span>
                        </div>
                    })
                }

            </div>
        </div>
    </React.Fragment>
}

export default Dashboard;