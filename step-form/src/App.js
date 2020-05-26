import React from 'react';
import { Route, Switch} from 'react-router-dom';
import Main from './Containers/main';
import AgentView from './Containers/AgentView/AgentView';
import GenerateLink from './Containers/GenerateLink';

import './App.css';

function App() {
  // const domain = 'https://test.ezeiatech.com/';
  // const options = {
  //   roomName: 'DemoHyperVergeKYC',
  //   width: 700,
  //   height: 700,
  //   parentNode: document.querySelector('#demo')
  // };
  // const api = new JitsiMeetExternalAPI(domain, options);
  return (
    <div className="App">
      <Switch>
        <Route path="/agent/:id" component={AgentView} />
        <Route path="/user/:id" component={Main} />
        <Route path="/" exact component={GenerateLink}/>
      </Switch>
    </div>
  );
}

export default App;
