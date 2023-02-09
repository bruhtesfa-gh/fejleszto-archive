import React, { useState } from "react";
import '../story.css';
const Story = (props) => {
    const [story, SetStory] = useState(props.story);

    return <React.Fragment>
        <div className="mx-2 story-container" style={{ backgroundImage: `url(${story.picture})` }}>
            <div className="story-holder ">
                <div className="tagger_profile_container">
                    <div className="tagger_profile_image" style={{ backgroundImage: `url(${story.profile})` }}>

                    </div>
                </div>
                <div className="tagger_name">
                    <span>{story.name}</span>
                </div>
            </div>
        </div>
    </React.Fragment>
}

export default Story;