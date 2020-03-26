import React from 'react';
import GlobalStyles from '../Styles/GlobalStyles';
import { HashRouter as Router } from "react-router-dom";
import Routes from './Routes';

export default () => {
    return (
        <>
            <GlobalStyles/>
            <Router>
                <Routes isLoggedIn={false} />
            </Router>
        </>
    );
};
