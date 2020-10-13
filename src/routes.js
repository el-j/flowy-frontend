import React from "react";
// import MerMaidProject from "./views/mermaid"
import Overview from "./views/Overview"
// import TextIdToScreen from "./views/textIdToScreen"
import ProjectView from "./views/ProjectView"
import NewProjectView from "./views/NewProjectView"

const routes = {
  "/": () => <Overview />,
  "/project/:projectname": ({projectname}) => <ProjectView projectName={projectname}/>,
  "/newproject/:projectname": ({projectname}) => <NewProjectView projectName={projectname}/>,
};



export default routes;
