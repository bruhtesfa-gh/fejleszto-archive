import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../header/header";
import LogIn from "../auth/login";
import Dashboard from "../dashboard/dashboard";
import Default from "../default/default";
import { useSelector } from "react-redux";
import ConnectFaceBook from "../auth/connect-facebook";
import StoryDetail from "../story_detail/story-detail";
const Home = () => {
    const isAuth = useSelector(state => state.auth.loggedin);

    return <React.Fragment>
        <Header />
        <React.Fragment>
            <Routes>
                <Route path="/" element={isAuth ? <Dashboard /> : <Default />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/connect-fb" element={<ConnectFaceBook />} />
                <Route path="/story/:id" element={<StoryDetail />} />
            </Routes>
        </React.Fragment>
    </React.Fragment>
}

export default Home;