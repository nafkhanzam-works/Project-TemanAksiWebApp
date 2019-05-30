import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Home from './Home';

export default function() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" render={null} />
                <Route path="/register" render={null} />
                
                <Route exact path="/" render={Home} />
                <>
                    <h1>404 Not Found!</h1>
                    <h2>
                        <Link to="/">Go to home page</Link>
                    </h2>
                </>
            </Switch>
        </BrowserRouter>
    );
}
