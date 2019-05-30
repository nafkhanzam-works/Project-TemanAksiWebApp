import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Home from './routes/Home';
import AuthForm from './routes/AuthForm';

export default function() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={() => <AuthForm login />} />
                <Route path="/register" component={AuthForm} />
                
                <Route exact path="/" component={Home} />
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
