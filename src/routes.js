import React from "react";
import {useRoutes, useRedirect} from 'hookrouter';
// import MerMaidProject from "./views/mermaid"
import Overview from "./views/Overview"
// import TextIdToScreen from "./views/textIdToScreen"
import ProjectView from "./views/ProjectView"

const routes = {
  "/": () => <Overview />,
  "/project/:projectname": ({projectname}) => <ProjectView projectName={projectname}/>,
};



export default routes;
