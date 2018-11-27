import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { Header } from '../Header/Header';
import { SpeakerPage } from '../pages/Speaker';


// COMPONENT

export const AppRouter = () => (
    <BrowserRouter>
        <Fragment>
            <Header />            
            <Switch>
                <Route path='/' component={SpeakerPage} exact={true} />
                <Redirect to="/" />
            </Switch>
        </Fragment>
    </BrowserRouter>
);