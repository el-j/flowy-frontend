import React from "react";
import { Switch, Route } from 'react-router-dom';

import Overview from "./views/Overview"
import ProjectView from "./views/ProjectView"
import NewProjectView from "./views/NewProjectView"

const routes = (props) => {
  const { projectName,searchResults, setProjectName } = props;
  return(
    <Switch>
     <Route exact path="/project/:projectName">
       <ProjectView setProjectName={setProjectName}/>
     </Route>
     <Route exact path="/newproject/:projectName">
       <NewProjectView projectName={projectName}/>
     </Route>
     <Route exact path="/">
       <Overview searchResults={searchResults}/>
     </Route>
     <Route>
      <>MissingPage</>
     </Route>
   </Switch>
  )
};

// <Route
//   exact
//   path="/booking"
//   render={(props) => (
//     <BookingDialog
//       showToaster={showToaster}
//       handleShowToaster={handleShowToaster}
//       handleSetToasterHeadline={handleSetToasterHeadline}
//       handleSetToasterBodyText={handleSetToasterBodyText}
//     />
//   )}
// ></Route>

export default routes;
