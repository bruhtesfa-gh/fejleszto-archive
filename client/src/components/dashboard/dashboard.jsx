import React, { useEffect, useState } from "react";
import '../story.css';
import Stories from "../stories/stories";
const Dashboard = () => {
    return <React.Fragment>
        <div className="col ">
            <Stories />
        </div>
    </React.Fragment>
}

export default Dashboard;