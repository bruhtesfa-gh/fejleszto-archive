import React, { useState } from "react";
import '../story.css';
import { useNavigate } from "react-router-dom";
const Story = (props) => {
    const [story, SetStory] = useState(props.story);
    const navigate = useNavigate();
    const navigateToStory = () => {
        navigate('/story/' + story._id);
    };
    return <React.Fragment>
        <div className="mx-2 story-container" onClick={navigateToStory}>
            <div className="story-image-container" >
                <div className="story-image" style={{ backgroundImage: `url(${story.thumbnail})` }}>
                </div>
            </div>
            <div className="story-holder ">
                <div className="tagger_profile_container zoom">
                    <div className="tagger_profile_image " style={{ backgroundImage: `url(${story.profile})` }}>

                    </div>
                </div>
                <div className="tagger_name">
                    <span>{story.name}</span>
                </div>
            </div>

            <div className="story-cover" />
        </div>
    </React.Fragment>
}

export default Story;