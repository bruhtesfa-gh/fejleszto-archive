import React, { useEffect, useState } from "react";
import axios from 'axios'
import { messageActions } from "../../store/slices/message";
import { useDispatch, useSelector } from "react-redux";
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