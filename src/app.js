import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from "./context";
import Init from './init';

import './interface/css/general.scss';

import Menu from './components/menu';
import Home from './pages/home';
import Manifesto from './pages/manifesto';
import Error from './pages/error';

function App() { return (
   <HashRouter>
      <Provider>
         <Init />
         <Menu />
         <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/manifesto" component={ Manifesto } />
            <Route component={ Error } />
         </Switch>
      </Provider>
   </HashRouter>
)}

export default App;