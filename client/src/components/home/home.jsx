import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../header/header";
import LogIn from "../auth/login";
const Home = () => {
    return <React.Fragment>
        <Header />
        <React.Fragment>
            <Routes>
                <Route path="/login" element={<LogIn />} />
            </Routes>
        </React.Fragment>
    </React.Fragment>
}

export default Home;