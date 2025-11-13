import React from "react";
import { Routes as RouterRoutes, Route } from 'react-router-dom';

import Overview from "./views/Overview";
import ProjectView from "./views/ProjectView";
import NewProjectView from "./views/NewProjectView";
import { RouteProps } from "./types";

const Routes: React.FC<RouteProps> = ({ searchResults, setProjectName }) => {
  return (
    <RouterRoutes>
      <Route path="/project/:projectName" element={<ProjectView setProjectName={setProjectName} />} />
      <Route path="/newproject/:projectName" element={<NewProjectView />} />
      <Route path="/" element={<Overview searchResults={searchResults} />} />
      <Route path="*" element={<>MissingPage</>} />
    </RouterRoutes>
  );
};

export default Routes;
