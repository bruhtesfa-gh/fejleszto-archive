import React, { useState } from "react";
import '../story.css';
const Story = (props) => {
    const [story, SetStory] = useState(props.story);

    return <React.Fragment>
        <div className="mx-2 story-container" >
            <div className="story-image-container" >
                <div className="story-image" style={{ backgroundImage: `url(${story.picture})` }}>
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