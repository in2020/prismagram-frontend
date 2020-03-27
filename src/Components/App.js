import React from 'react';
import GlobalStyles from '../Styles/GlobalStyles';
import {HashRouter as Router} from 'react-router-dom';
import Routes from './Routes';
import Theme from '../Styles/Theme';
import {ThemeProvider} from 'styled-components';
import {useQuery} from 'react-apollo-hooks';
import { gql } from "apollo-boost"

const QUERY = gql`
    {
        isLoggedIn @client
    }
`

export default () => {
    const {
        data: { isLoggedIn }
    } = useQuery(QUERY);

    return (
        <ThemeProvider theme={Theme}>
            <>
                <GlobalStyles/>
                <Router>
                    <Routes isLoggedIn={isLoggedIn}/>
                </Router>
            </>
        </ThemeProvider>
    );
};
