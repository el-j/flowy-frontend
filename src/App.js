import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import {useRoutes} from 'hookrouter';

import MerMaidProject from "./views/mermaid"
import Overview from "./views/Overview"
import TextIdToScreen from "./views/textIdToScreen"

// import FlowChart from "./views/FlowChart"

import MyNavbar from "./components/myNavbar"
import MyComponent from "./components/fetchApi"

// import Topics from "./views/topics"
function ProjectView() {
  // We can call useParams() here to get the params,
  // or in any child element as well!
  let { project } = useParams()
  // ...
}


export default function App() {
  return (
    <Router>
      <div>
        <MyNavbar />
        <Switch>
          <Route path="/textIdToScreen">
            <TextIdToScreen />
          </Route>
          <Route path="/">
            <Overview />
          </Route>
          <Route path="/project/:projectname">
            <ProjectView />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// <Route path="/topics">
//   <Topics useParams useRouteMatch/>
// </Route>
