import React from 'react';
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router';
import App from './components/App.jsx';
import About from './components/About.jsx';
import Repos from './components/Repos.jsx';
import Repo from './components/Repo.jsx';

render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path="/repos" component={Repos}>
                <Route path="/repos/:userName/:repoName" component={Repo}/>
            </Route>
            <Route path="/about" component={About}/>
        </Route>
    </Router>
), document.getElementById('app'))
